package com.example.demo.service.impl;

import com.example.demo.db.entity.User;
import com.example.demo.rest.dto.request.user.AuthorizationUserDTO;
import com.example.demo.rest.dto.request.user.RegistrationUserDTO;
import com.example.demo.rest.dto.response.success.JwtAuthenticationDTO;
import com.example.demo.service.api.UserManagementService;
import com.example.demo.service.exception.ServiceNotFoundException;
import com.example.demo.utils.JwtService;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserManagementService userManagementService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Регистрация пользователя
     *
     * @param registrationUserDTO данные пользователя
     */
    public void registration(RegistrationUserDTO registrationUserDTO) throws Exception {
        User user = userManagementService.createNewUser(registrationUserDTO);
    }

    /**
     * Аутентификация пользователя
     *
     * @param authorizationUserDTO данные пользователя
     * @return токен
     */
    public JwtAuthenticationDTO authorization(AuthorizationUserDTO authorizationUserDTO) throws AuthException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authorizationUserDTO.getMail(),
                authorizationUserDTO.getPassword()
        ));

        User user = userManagementService
                .findUserIdByLoginAndPassword(authorizationUserDTO.getMail(), authorizationUserDTO.getPassword())
                .orElseThrow(() -> {
                    throw new AuthenticationServiceException("[user] не авторизовался");
                });

        if(!user.getMailConfirmation())
            throw new ServiceNotFoundException("[mailConfirmation] не найден");

        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationDTO(jwt);
    }

}
