package com.objectpartners.plummer.sammies.controller;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import io.micronaut.security.annotation.Secured;

import java.security.Principal;

@Controller("/user")
public class UserController {
    @Get("/")
    @Produces(MediaType.TEXT_PLAIN)
    public String getUser(Principal principal) {
        return principal.getName();
    }
}