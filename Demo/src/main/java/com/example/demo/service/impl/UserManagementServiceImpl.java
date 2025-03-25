package com.example.demo.service.impl;

import com.example.demo.db.entity.User;
import com.example.demo.db.repository.api.UserRepository;
import com.example.demo.rest.dto.request.user.ChangeMailUserDTO;
import com.example.demo.rest.dto.request.user.ChangePasswordUserDTO;
import com.example.demo.rest.dto.request.user.RegistrationUserDTO;
import com.example.demo.service.api.EmailService;
import com.example.demo.service.api.UserManagementService;
import com.example.demo.service.exception.ServiceNotEqual;
import com.example.demo.service.exception.ServiceNotFoundException;
import com.example.demo.utils.CheckArgsUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import java.util.*;

@Service
public class UserManagementServiceImpl implements UserManagementService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setPasswordEncoder() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Autowired
    private EmailService emailService;

    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    @Autowired
    private FreeMarkerConfigurer freemarkerConfig;


    @Value("${spring.host}")
    private String host;

    /**
     * Добавление нового пользователя в таблицу User в бд application
     *
     * @return идентификатор добавленного пользователя
     */
    @Override
    @Transactional
    public User createNewUser(RegistrationUserDTO registrationUserDTO) throws Exception {
        // Проверка данных
        CheckArgsUtils.requireNonNull(registrationUserDTO.getMail(), "[mail] должен быть задан");
        CheckArgsUtils.requireNonNull(registrationUserDTO.getPassword(), "[password] должен быть задан");

        // Проверка на уникальность полей
        if (userRepository.findByMail(registrationUserDTO.getMail())
                          .isPresent())
            CheckArgsUtils.requireRecordAlreadyExists("[mail] уже существует");


        User userToSave = new User(registrationUserDTO.getMail(), passwordEncoder.encode(registrationUserDTO.getPassword()));
        User savedUser = userRepository.save(userToSave);

        registrationUserDTO.setId(savedUser.getId());

        Map<Object, Object> mailData = new HashMap<Object, Object>();
        mailData.put("host", host);
        mailData.put("user", registrationUserDTO);

        String templateContent = FreeMarkerTemplateUtils
                .processTemplateIntoString(freemarkerConfig.getConfiguration()
                                                           .getTemplate("registrationMail.ftlh"),
                        mailData);

        emailService.sendMessage(registrationUserDTO.getMail(), "Регистрация", templateContent);

        return savedUser;
    }

    /**
     * Поиск пользователя по логину и паролю
     *
     * @return номер найденного пользователя
     */
    public Optional<User> findUserIdByLoginAndPassword(String mail, String password) {

        CheckArgsUtils.requireNonNull(mail, "[mail] должен быть задан");
        CheckArgsUtils.requireNonNull(password, "[password] должен быть задан");

        Optional<User> user = userRepository.findByMail(mail)   // Поиск пользователя по почте
                                            .filter((u) -> {    // Проверка пароля
                                                return passwordEncoder.matches(password, u.getPassword());
                                            });

        return user;
    }

    @Override
    @Transactional
    public void deleteUser(UUID userId) {
        CheckArgsUtils.requireNonNull(userId, "[userId] должен быть задан");

        userRepository.deleteAllById(userId);
    }

    @Override
    public void confirmUserMail(String confirmationId) {
        CheckArgsUtils.requireNonNull(confirmationId, "[confirmationId] должен быть задан");

        User user = userRepository.findById(UUID.fromString(confirmationId))
                                  .orElseThrow(() -> new ServiceNotFoundException("Пользователь с [confirmationId] не найден"));   // Поиск пользователя по id

        user.setMailConfirmation(true);

        userRepository.save(user);
    }

    @Override
    public User findUserByUserMail(String mail) {

        CheckArgsUtils.requireNonNull(mail, "[mail] должен быть задан");

        User user = userRepository.findByMail(mail).orElseThrow(()->new ServiceNotFoundException("Пользователь с [mail] не найден"));   // Поиск пользователя по почте

        return user;
    }

    /**
     * Возвращает пользователя по его идентификатору
     *
     * @param userId идентификатор пользователя
     * @return пользователь
     */
    @Override
    public User getUserByUserId(UUID userId) {
        CheckArgsUtils.requireNonNull(userId, "[userId] должен быть задан");

        return userRepository.findById(userId)
                             .orElse(null);
    }

    @Override
    public void changeUserMail(ChangeMailUserDTO changeMailUserDTO) throws Exception {

        UUID userId = UUID.fromString(changeMailUserDTO.getId());
        String mail = changeMailUserDTO.getMail();

        CheckArgsUtils.requireNonNull(userId, "[userId] должен быть задан");

        // Проверка на существование пользователя
        User user = userRepository.findById(userId)
                                  .orElse(null);
        CheckArgsUtils.requireNotFound(user, "Пользователь с [userId] не найден");

        // Проверка данных для входа
        CheckArgsUtils.requireNonNull(mail, "[mail] должен быть задан");


        // Проверка на уникальность полей
        if (!user.getMail()
                 .equals(changeMailUserDTO.getMail()) && userRepository.findByMail(changeMailUserDTO.getMail())
                                                                       .isPresent())
            CheckArgsUtils.requireRecordAlreadyExists("[mail] уже существует");

        Map<Object, Object> mailData = new HashMap<Object, Object>();
        mailData.put("host", host);
        mailData.put("lastMail", user.getMail());
        mailData.put("user", changeMailUserDTO);

        String templateContent = FreeMarkerTemplateUtils
                .processTemplateIntoString(freemarkerConfig.getConfiguration()
                                                           .getTemplate("changeMail.ftlh"),
                        mailData);

        emailService.sendMessage(changeMailUserDTO.getMail(), "Изменение почты", templateContent);

        User newUser = new User(userId, mail, user.getPassword());
        userRepository.save(newUser);
    }


    @Override
    public void changeUserPassword(ChangePasswordUserDTO changePasswordUserDTO) {

        UUID userId = UUID.fromString(changePasswordUserDTO.getId());
        String newPassword = changePasswordUserDTO.getNewPassword();
        String oldPassword = changePasswordUserDTO.getOldPassword();

        CheckArgsUtils.requireNonNull(userId, "[userId] должен быть задан");

        CheckArgsUtils.requireNonNull(newPassword, "[newPassword] должен быть задан");
        CheckArgsUtils.requireNonNull(oldPassword, "[oldPassword] должен быть задан");

        // Проверка на существование пользователя
        User user = userRepository.findById(userId)
                                  .orElse(null);
        CheckArgsUtils.requireNotFound(user, "Пользователь с [userId] не найден");

        String encodedOldPassword = passwordEncoder.encode(changePasswordUserDTO.getOldPassword());

        // Проверка на равенство старого и текущего пароля
        if(!passwordEncoder.matches(changePasswordUserDTO.getOldPassword(),user.getPassword()))
            throw  new ServiceNotEqual("Старый пароль не верен");

        User newUser = new User(userId, user.getMail(), passwordEncoder.encode(changePasswordUserDTO.getNewPassword()));
        userRepository.save(newUser);
    }


    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {

        User user = userRepository.findByMail(mail)
                                  .orElseThrow(() -> {
                                      throw new UsernameNotFoundException("User not found with mail: " + mail);
                                  });

        return new org.springframework.security.core.userdetails.User(user.getMail(), user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("USER")));
    }
}
