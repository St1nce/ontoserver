package com.example.demo.rest.impl;


import com.example.demo.rest.api.UserController;
import com.example.demo.rest.dto.request.user.AuthorizationUserDTO;
import com.example.demo.rest.dto.request.user.ChangeMailUserDTO;
import com.example.demo.rest.dto.request.user.ChangePasswordUserDTO;
import com.example.demo.rest.dto.request.user.RegistrationUserDTO;
import com.example.demo.rest.dto.response.api.ResponseDto;
import com.example.demo.rest.dto.response.error.ResponseErrorDtoImpl;
import com.example.demo.rest.dto.response.success.ResponseSuccessDto;
import com.example.demo.service.api.UserManagementService;
import com.example.demo.service.exception.ServiceNullPointerException;
import com.example.demo.service.impl.AuthenticationService;
import com.example.demo.utils.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequiredArgsConstructor

public class UserControllerImpl implements UserController {
    private final AuthenticationService authenticationService;
    private final UserManagementService userManagementService;

    public static final String HEADER_NAME = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    private final JwtService jwtUtils;

    @Override
    @PostMapping({"/auth"})
    public ResponseEntity<ResponseDto> Authorization(@RequestBody AuthorizationUserDTO authorizationUser) {
        try {
            return ResponseSuccessDto.sendResponse(authenticationService.authorization(authorizationUser));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }


    @Override
    @PostMapping({"/reg"})
    public ResponseEntity<ResponseDto> Registration(
            @RequestBody RegistrationUserDTO registrationUser) {
        try {
            authenticationService.registration(registrationUser);
            return ResponseSuccessDto.sendResponse();
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @GetMapping({"/mail/confirmation/{confirmationId}"})
    public ResponseEntity<ResponseDto> MailConfirmation(
            @PathVariable String confirmationId) {

        try {
            userManagementService.confirmUserMail(confirmationId);
            return ResponseSuccessDto.sendResponse();
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @GetMapping({"/info"})
    public ResponseEntity<ResponseDto> GetUserInfo(HttpServletRequest request) {
        try {

            var authHeader = request.getHeader(HEADER_NAME);
            if (StringUtils.isEmpty(authHeader) || !authHeader.startsWith(BEARER_PREFIX)) {
                throw new ServiceNullPointerException("[token] должен быть задан");
            }

            // Обрезаем префикс и получаем имя пользователя из токена
            var jwt = authHeader.substring(BEARER_PREFIX.length());
            var username = jwtUtils.extractUserName(jwt);


            RegistrationUserDTO user = new RegistrationUserDTO(userManagementService.findUserByUserMail(username));

            return ResponseSuccessDto.sendResponse(user);
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @PostMapping("/change/personalData")
    public ResponseEntity<ResponseDto> ChangeUserMail(@RequestBody ChangeMailUserDTO userMailDTO) {
        try {
            userManagementService.changeUserMail(userMailDTO);
            return ResponseSuccessDto.sendResponse(null);
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @PostMapping("/change/password")
    public ResponseEntity<ResponseDto> ChangeUserPassword(@RequestBody ChangePasswordUserDTO userPasswordDTO) {
        try {
            userManagementService.changeUserPassword(userPasswordDTO);
            return ResponseSuccessDto.sendResponse(null);
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @PostMapping("/delete")
    public ResponseEntity<ResponseDto> DeleteUser(String userId) {
        try {
            userManagementService.deleteUser(UUID.fromString(userId));
            return ResponseSuccessDto.sendResponse(null);
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }
}
