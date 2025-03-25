package com.example.demo.rest.impl;

import com.example.demo.rest.api.AccessController;
import com.example.demo.rest.dto.response.api.ResponseDto;
import com.example.demo.rest.dto.response.error.ResponseErrorDtoImpl;
import com.example.demo.rest.dto.response.success.ResponseSuccessDto;
import com.example.demo.service.api.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccessControllerImpl implements AccessController {

    @Override
    public ResponseEntity<ResponseDto> getAccess() {
        try {
            return ResponseSuccessDto.sendResponse();
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }
}
