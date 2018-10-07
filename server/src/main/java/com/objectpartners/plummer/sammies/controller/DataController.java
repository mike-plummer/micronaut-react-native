package com.objectpartners.plummer.sammies.controller;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import io.micronaut.security.annotation.Secured;

import java.time.LocalDateTime;

@Secured("ADMIN")
@Controller("/data")
public class DataController {
    @Get("/")
    @Produces(MediaType.TEXT_PLAIN)
    public String getData() {
        return LocalDateTime.now().toString();
    }
}