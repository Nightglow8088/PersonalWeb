package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "basic_account", schema = "user_account")
@Data
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String password;

    private String role;

    @Column(name = "mail_address")
    private String mailAddress;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;   // 新增枚举字段


}
