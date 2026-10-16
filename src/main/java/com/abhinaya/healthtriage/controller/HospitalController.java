package com.abhinaya.healthtriage.controller;

import com.abhinaya.healthtriage.dto.Hospital;
import com.abhinaya.healthtriage.service.HospitalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    private final HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService){
        this.hospitalService=hospitalService;
    }
    @Operation(summary = "Get nearby hospitals")
    @GetMapping("/nearby")
    public List<Hospital> nearby(){

        return hospitalService.nearbyHospitals();
    }
}