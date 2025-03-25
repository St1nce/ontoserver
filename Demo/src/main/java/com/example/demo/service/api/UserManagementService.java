package com.example.demo.service.api;

import com.example.demo.db.entity.User;
import com.example.demo.rest.dto.request.user.RegistrationUserDTO;
import com.example.demo.rest.dto.request.user.ChangeMailUserDTO;
import com.example.demo.rest.dto.request.user.ChangePasswordUserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;
import java.util.UUID;

public interface UserManagementService extends UserDetailsService {



    User createNewUser(RegistrationUserDTO registrationUserDTO) throws Exception;

    User getUserByUserId(UUID userId);

    void changeUserMail(ChangeMailUserDTO changeMailUserDTO) throws Exception;

    void changeUserPassword(ChangePasswordUserDTO changePasswordUserDTO);

    Optional<User> findUserIdByLoginAndPassword(String mail, String password);

    void deleteUser(UUID userId);

    void confirmUserMail(String confirmationId);

    User findUserByUserMail(String username);
}
