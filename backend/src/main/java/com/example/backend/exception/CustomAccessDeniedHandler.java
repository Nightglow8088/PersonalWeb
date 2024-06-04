package com.example.backend.exception;

import com.example.backend.response.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();


    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        // 返回自定义的 403 响应
        ResponseEntity<Response<String>> responseEntity = new ResponseEntity<>(Response.error(accessDeniedException.getMessage()), HttpStatus.FORBIDDEN);

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
//        response.getWriter().write("{\"error\": \"" + accessDeniedException.getMessage() + "\"}");
        response.getWriter().write(objectMapper.writeValueAsString(responseEntity.getBody()));

    }
}
