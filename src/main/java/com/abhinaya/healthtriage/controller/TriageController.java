package com.abhinaya.healthtriage.controller;

import com.abhinaya.healthtriage.dto.RiskResult;
import com.abhinaya.healthtriage.entity.SymptomReport;
import com.abhinaya.healthtriage.service.TriageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
@RestController
@RequestMapping("/api/triage")
public class TriageController {

    private final TriageService triageService;

    public TriageController(TriageService triageService) {
        this.triageService = triageService;
    }
    @Operation(summary = "Calculate patient risk and recommend a doctor")
    @PostMapping("/analyze")
    public RiskResult analyze(@RequestBody SymptomReport report) {
        return triageService.calculateRisk(report);
    }
    @Operation(summary = "View all previously saved patient reports")
    @GetMapping("/history")
    public List<SymptomReport> history() {
        return triageService.getHistory();
    }

}