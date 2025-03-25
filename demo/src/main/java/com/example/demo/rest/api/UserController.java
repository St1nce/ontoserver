package com.example.demo.rest.api;

import com.example.demo.rest.dto.request.user.AuthorizationUserDTO;
import com.example.demo.rest.dto.request.user.RegistrationUserDTO;
import com.example.demo.rest.dto.request.user.ChangePasswordUserDTO;
import com.example.demo.rest.dto.request.user.ChangeMailUserDTO;
import com.example.demo.rest.dto.response.api.ResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("/user")
public interface UserController {

    /**
     * Авторизация пользователя
     * @param authorizationUser Логин и пароль
     * @return JWT
     */

    ResponseEntity<ResponseDto> Authorization(AuthorizationUserDTO authorizationUser);

    /**
     * Регистрация
     * @param registrationUser данные пользователя, который хочет зарегистрироваться
     * @return JWT
     */
    ResponseEntity<ResponseDto> Registration(RegistrationUserDTO registrationUser);

    @GetMapping({"/mail/confirmation/{confirmationId}"})
    ResponseEntity<ResponseDto> MailConfirmation(
            @PathVariable String confirmationId);

    /**
     * Получение информации о пользователе
     * @return данные пользователя
     */
    @GetMapping({"/info"})
    ResponseEntity<ResponseDto> GetUserInfo(HttpServletRequest request);

    @PostMapping("/change/mail")
    ResponseEntity<ResponseDto> ChangeUserMail(@RequestBody ChangeMailUserDTO userMailDTO);


    @PostMapping("/change/password")
    ResponseEntity<ResponseDto> ChangeUserPassword(@RequestBody ChangePasswordUserDTO userPasswordDTO);

    @PostMapping("/delete")
    ResponseEntity<ResponseDto> DeleteUser(@RequestBody String userId);
}
