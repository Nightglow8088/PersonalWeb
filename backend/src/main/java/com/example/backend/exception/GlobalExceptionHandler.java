package com.example.backend.exception;

import com.example.backend.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    // —— 只处理业务异常 ——
    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Response<String>> handleEmailExists(EmailAlreadyExistsException ex) {
        // 这里用你自己的 Response 封装格式
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Response.error(ex.getMessage()));
    }
//
//    @ExceptionHandler(InvalidJwtAuthenticationException.class)
//    @ResponseStatus(HttpStatus.FORBIDDEN)
//    public ResponseEntity<String> handleInvalidJwtAuthenticationException(InvalidJwtAuthenticationException ex) {
//        // 返回自定义的 403 响应
//        return new ResponseEntity<>("Access Denied: " + ex.getMessage(), HttpStatus.FORBIDDEN);
//    }
//
//    @ExceptionHandler(AccessDeniedException.class)
//    @ResponseStatus(HttpStatus.FORBIDDEN)
//    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException ex) {
//        // 返回自定义的 403 响应
//        return new ResponseEntity<>("Access Denied: You do not have the necessary permissions to access this resource.", HttpStatus.FORBIDDEN);
//    }

}
