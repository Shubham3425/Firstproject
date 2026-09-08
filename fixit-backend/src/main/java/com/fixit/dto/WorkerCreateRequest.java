package com.fixit.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkerCreateRequest {

    private Long userId;
    private Long serviceId;
    private String bio;
    private Integer experienceYears;
    private BigDecimal hourlyRate;
    private String city;
}