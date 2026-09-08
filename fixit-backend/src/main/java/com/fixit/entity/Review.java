package com.fixit.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Review {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @ManyToOne @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne @JoinColumn(name = "worker_id", nullable = false)
    private Worker worker;

    @Min(1) @Max(5) @Column(nullable = false)
    private Integer rating;

    private String comment;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }
}
