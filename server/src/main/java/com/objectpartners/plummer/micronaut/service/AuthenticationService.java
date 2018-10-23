package com.objectpartners.plummer.micronaut.service;

import io.micronaut.security.authentication.*;
import io.reactivex.Flowable;
import org.reactivestreams.Publisher;

import javax.inject.Singleton;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Singleton
public class AuthenticationService implements AuthenticationProvider {

    // Build a mock in-memory user database
    // Note that the passwords are stored in hashed format (yay for security best practices!!!!!)
    private final Map<String, String> users = new HashMap<String, String>() {{
        put("userA", hash("blorg"));
        put("userB", hash("blah"));
    }};

    @Override
    public Publisher<AuthenticationResponse> authenticate(AuthenticationRequest authenticationRequest) {
        return users.entrySet().stream()
                .filter(entry -> entry.getKey().equals(authenticationRequest.getIdentity()) && entry.getValue().equals(authenticationRequest.getSecret()))
                .findAny()
                .map(entry -> Flowable.<AuthenticationResponse>just(new UserDetails(entry.getKey(), Arrays.asList("USER"))))
                .orElse(Flowable.just(new AuthenticationFailed()));
    }

    private static String hash(String value) {
        try {
            // Using SHA-512 since it's easily implemented both server- and client-side in this example
            // Please the best possible algorithm that's cryptographically secure and designed for password security:
            // https://www.owasp.org/index.php/Cryptographic_Storage_Cheat_Sheet#Rule_-_Use_strong_approved_cryptographic_algorithms
            MessageDigest digest = MessageDigest.getInstance("SHA-512");
            byte[] hashBytes = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
