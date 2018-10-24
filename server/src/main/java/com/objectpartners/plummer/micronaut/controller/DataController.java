package com.objectpartners.plummer.micronaut.controller;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.client.RxHttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import io.reactivex.Single;

import javax.inject.Inject;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;

import static io.micronaut.http.HttpRequest.GET;

@Controller("/data")
public class DataController {
    @Client("http://localhost:8080/")
    @Inject
    private RxHttpClient httpClient;

    /**
     * Accepts an HTTP GET request against '/data'.
     * Retrieves data via HTTP GET to 'http://localhost:8080/data/source', waits 2 seconds, then returns.
     */
    @Get
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @Produces(MediaType.TEXT_PLAIN)
    public Single<String> getData() {
        return httpClient
                .retrieve(GET("/data/source"))
                .firstOrError()
                .map(value -> value + " - SECURE")
                .delay(2, TimeUnit.SECONDS);
    }

    /**
     * This is where the data really 'comes from' - responds to the nested HTTP request to return the current time
     * and a super-funny little quote
     */
    @Get("/source")
    @Secured(SecurityRule.IS_ANONYMOUS)
    @Produces(MediaType.TEXT_PLAIN)
    public String getSourceData() {
        return LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")) + ": So data, much wow";
    }
}