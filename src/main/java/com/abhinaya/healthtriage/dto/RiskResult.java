package com.abhinaya.healthtriage.dto;

public class RiskResult {

    private int score;
    private String level;
    private String doctorType;

    public RiskResult(int score, String level, String doctorType) {
        this.score = score;
        this.level = level;
        this.doctorType = doctorType;
    }

    public int getScore() {
        return score;
    }

    public String getLevel() {
        return level;
    }

    public String getDoctorType() {
        return doctorType;
    }
}