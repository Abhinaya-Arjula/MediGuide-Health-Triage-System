package com.abhinaya.healthtriage.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
@RestController
public class HealthController {
    @Operation(summary = "Check whether the Health Triage API is running")
    @GetMapping("/health")
    public String health() {
        return "Health Triage API is running!";
    }
}