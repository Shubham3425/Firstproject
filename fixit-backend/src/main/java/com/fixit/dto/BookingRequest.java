package com.fixit.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class BookingRequest {
    @NotNull private Long workerId;
    @NotNull private Long serviceId;
    @NotNull private LocalDateTime scheduledAt;
    @NotBlank private String address;
    private String city;
    private String problemDescription;
}
