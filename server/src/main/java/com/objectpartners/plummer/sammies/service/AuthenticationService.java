package com.objectpartners.plummer.sammies.service;

import io.micronaut.security.authentication.*;
import io.reactivex.Flowable;
import org.reactivestreams.Publisher;

import javax.inject.Singleton;
import java.util.Arrays;

@Singleton
public class AuthenticationService implements AuthenticationProvider {

    @Override
    public Publisher<AuthenticationResponse> authenticate(AuthenticationRequest authenticationRequest) {
        if ( authenticationRequest.getIdentity().equals("user") &&
                authenticationRequest.getSecret().equals("password") ) {
            return Flowable.just(new UserDetails((String) authenticationRequest.getIdentity(), Arrays.asList("ADMIN")));
        }
        return Flowable.just(new AuthenticationFailed());
    }
}
