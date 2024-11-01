package com.example.backend.repositories;


import com.example.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserAccountRepository extends JpaRepository<Users, Long> {

    @Query(value = "SELECT * FROM user_account.basic_account WHERE  mail_address= :mailAddress AND password= :password", nativeQuery = true)
    Users findMatchedUser(@Param("mailAddress") String mailAddress, @Param("password") String password);



    @Query(value = "SELECT * FROM user_account.basic_account ba " +
            "join user_account.user_mail_account us " +
            "on ba.mail_address  = us.mail_account " +
            "WHERE ba.mail_address  = :email AND " +
            "ba.password =:password and " +
            "us.enabled", nativeQuery = true)

    Users findByMailAddress(@Param("email") String email, @Param("password") String password);


}
