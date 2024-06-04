package com.example.backend.response;

import lombok.Data;

@Data
public class Response<T> {

    private boolean success;

    private String message;

    private T data;

    private Integer code;


    // Getters and setters
    public static <T> Response<T> ok() {
        Response<T> response = new Response<>();
        response.setSuccess(true);
        response.setCode(WebHttpCode.SERVICE_SUCCESS.getCode());
        response.setMessage("operation success");
        return response;
    }

    public static <T> Response<T> ok(T data) {
        Response<T> webResult = new Response<>();
        webResult.setSuccess(true);
        webResult.setCode(WebHttpCode.SERVICE_SUCCESS.getCode());
        webResult.setMessage("operation success");
        webResult.setData(data);
        return webResult;
    }

    public static <T> Response<T> error() {
        Response<T> webResult = new Response<>();
        webResult.setSuccess(false);
        webResult.setCode(WebHttpCode.SERVICE_ERROR.getCode());
        webResult.setMessage("operation fail");
        return webResult;
    }

    public static <T> Response<T> error(T data) {
        Response<T> webResult = new Response<>();
        webResult.setSuccess(false);
        webResult.setCode(WebHttpCode.SERVICE_ERROR.getCode());
        webResult.setMessage("operation fail");
        webResult.setData(data);
        return webResult;
    }

    public Response initialMessage(String message) {
        this.setMessage(message);
        return this;
    }

    public Response initialData(T data) {
        this.setData(data);
        return this;
    }



}
