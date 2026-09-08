package com.fixit.controller;

import com.fixit.dto.ReviewRequest;
import com.fixit.entity.Review;
import com.fixit.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> addReview(@Valid @RequestBody ReviewRequest req, Authentication auth) {
        return ResponseEntity.ok(reviewService.addReview(req, auth.getName()));
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<List<Review>> getWorkerReviews(@PathVariable Long workerId) {
        return ResponseEntity.ok(reviewService.getWorkerReviews(workerId));
    }
}
