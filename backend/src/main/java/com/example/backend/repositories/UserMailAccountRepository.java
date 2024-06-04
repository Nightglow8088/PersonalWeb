package com.example.backend.repositories;

import com.example.backend.model.UserMailAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMailAccountRepository extends JpaRepository<UserMailAccount, Long> {
    UserMailAccount findByVerificationToken(String token);
}
