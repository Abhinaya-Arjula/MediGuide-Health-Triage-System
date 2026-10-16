package com.abhinaya.healthtriage.service;

import com.abhinaya.healthtriage.dto.Hospital;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalService {

    public List<Hospital> nearbyHospitals() {
        return List.of(
                new Hospital(
                        "Government Hospital",
                        "Address not yet verified",
                        16.43, 80.55
                ),
                new Hospital(
                        "City Care Hospital",
                        "Address not yet verified",
                        16.44, 80.56
                ),
                new Hospital(
                        "Apollo Clinic",
                        "Address not yet verified",
                        16.45, 80.57
                )
        );
    }
}