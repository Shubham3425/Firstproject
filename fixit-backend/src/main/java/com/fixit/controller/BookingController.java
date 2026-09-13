package com.fixit.controller;

import com.fixit.dto.BookingRequest;
import com.fixit.entity.Booking;
import com.fixit.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequest req, Authentication auth) {
        return ResponseEntity.ok(bookingService.createBooking(req, auth.getName()));
    }

    @GetMapping("/my")
public ResponseEntity<List<Booking>> myBookings(Authentication auth) {
    return ResponseEntity.ok(bookingService.getMyBookings(auth.getName()));
}

@GetMapping("/worker/my")
public ResponseEntity<List<Booking>> workerBookings(Authentication auth) {
    return ResponseEntity.ok(
            bookingService.getWorkerBookings(auth.getName())
    );
}

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Booking> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(bookingService.updateStatus(id, status));
    }
}
