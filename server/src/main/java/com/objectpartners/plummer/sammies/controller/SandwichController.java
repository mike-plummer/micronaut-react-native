package com.objectpartners.plummer.sammies.controller;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import io.micronaut.security.annotation.Secured;

@Controller("/hello")
public class SandwichController {
    @Get("/")
    @Produces(MediaType.TEXT_PLAIN)
    public String index() {
        return "Hello World";
    }

    @Get("/secured")
    @Secured("ROLE_USER")
    public String secured() {
        return "Secured";
    }
}