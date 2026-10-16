package com.abhinaya.healthtriage.controller;

import com.abhinaya.healthtriage.service.AiService;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }
    @Operation(summary = "Generate an AI health explanation")
    @PostMapping("/explain")
    public String explain(
            @RequestParam String level,
            @RequestParam String doctor) {

        return aiService.explain(level, doctor);
    }
}