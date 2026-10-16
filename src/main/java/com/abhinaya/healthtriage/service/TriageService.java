package com.abhinaya.healthtriage.service;

import com.abhinaya.healthtriage.dto.RiskResult;
import com.abhinaya.healthtriage.entity.SymptomReport;
import com.abhinaya.healthtriage.repository.SymptomReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TriageService {

    private final SymptomReportRepository repository;

    public TriageService(SymptomReportRepository repository) {
        this.repository = repository;
    }

    public RiskResult calculateRisk(SymptomReport report) {

        int score = 0;

        if (report.getOxygen() != null && report.getOxygen() < 92)
            score += 40;

        if (report.getTemperature() != null && report.getTemperature() > 101)
            score += 15;

        if (report.getHeartRate() != null && report.getHeartRate() > 120)
            score += 20;

        if (report.getPainLevel() != null && report.getPainLevel() >= 8)
            score += 20;

        if (report.getSymptoms() != null &&
                report.getSymptoms().toLowerCase().contains("chest pain"))
            score += 35;

        // Save report to PostgreSQL
        repository.save(report);

        String level;
        String doctor;

        if (score >= 81) {
            level = "Emergency";
            doctor = "Emergency Physician";
        } else if (score >= 51) {
            level = "High";
            doctor = "General Physician";
        } else if (score >= 21) {
            level = "Medium";
            doctor = "General Physician";
        } else {
            level = "Low";
            doctor = "General Physician";
        }

        // Smart doctor recommendation
        if (report.getSymptoms() != null) {

            String text = report.getSymptoms().toLowerCase();

            if (text.contains("chest pain")) {
                doctor = "Cardiologist";
            } else if (text.contains("cough") || text.contains("breathing")) {
                doctor = "Pulmonologist";
            } else if (text.contains("headache")) {
                doctor = "Neurologist";
            } else if (text.contains("skin")) {
                doctor = "Dermatologist";
            } else if (text.contains("eye")) {
                doctor = "Ophthalmologist";
            }
        }

        return new RiskResult(score, level, doctor);
    }

    public List<SymptomReport> getHistory() {
        return repository.findAllByOrderByIdDesc();
    }
}