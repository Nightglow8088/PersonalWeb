package com.example.backend.tools;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.stereotype.Component;

@Component
public class OAuth2DebugPrinter {

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @PostConstruct
    public void printRedirectUri() {
        ClientRegistration reg = clientRegistrationRepository.findByRegistrationId("google");
        System.out.println(">>> Google OAuth2 redirect URI = "
                + reg.getRedirectUri().replace("{baseUrl}", "https://kevinb.website")
                .replace("{registrationId}", "google"));
    }
}