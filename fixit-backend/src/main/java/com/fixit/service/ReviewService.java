package com.fixit.service;

import com.fixit.dto.ReviewRequest;
import com.fixit.entity.*;
import com.fixit.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final WorkerService workerService;

    public Review addReview(ReviewRequest req, String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail).orElseThrow(() -> new RuntimeException("User not found"));
        Booking booking = bookingRepository.findById(req.getBookingId()).orElseThrow(() -> new RuntimeException("Booking not found"));
        if (reviewRepository.existsByBookingIdAndCustomerId(req.getBookingId(), customer.getId()))
            throw new RuntimeException("Review already submitted");
        Review review = Review.builder()
                .booking(booking).customer(customer).worker(booking.getWorker())
                .rating(req.getRating()).comment(req.getComment()).build();
        Review saved = reviewRepository.save(review);
        workerService.updateRating(booking.getWorker().getId());
        return saved;
    }

    public List<Review> getWorkerReviews(Long workerId) {
        return reviewRepository.findByWorkerIdOrderByCreatedAtDesc(workerId);
    }
}
