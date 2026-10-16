package com.abhinaya.healthtriage.repository;

import com.abhinaya.healthtriage.entity.SymptomReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SymptomReportRepository extends JpaRepository<SymptomReport, Long> {

    List<SymptomReport> findAllByOrderByIdDesc();
}