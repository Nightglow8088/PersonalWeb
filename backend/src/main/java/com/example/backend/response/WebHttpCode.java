package com.example.backend.response;

public enum WebHttpCode {

    SERVICE_SUCCESS(200, "操作成功"),
    SERVICE_ERROR(500, "操作失败");

    private final int code;
    private final String message;

    WebHttpCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
