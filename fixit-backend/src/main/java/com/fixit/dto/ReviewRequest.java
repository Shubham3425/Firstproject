package com.fixit.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ReviewRequest {
    @NotNull private Long bookingId;
    @NotNull @Min(1) @Max(5) private Integer rating;
    private String comment;
}
