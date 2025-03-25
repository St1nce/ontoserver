package com.example.demo.rest.api;

import com.example.demo.rest.dto.response.api.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

public interface AccessController {
    @GetMapping("/access")
    ResponseEntity<ResponseDto> getAccess();
}
