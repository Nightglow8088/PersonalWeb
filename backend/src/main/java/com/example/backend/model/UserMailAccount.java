package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_mail_account", schema = "user_account")
public class UserMailAccount {
    @Id
    private String mailAccount;

    private boolean enabled;

    private String verificationToken;

}
