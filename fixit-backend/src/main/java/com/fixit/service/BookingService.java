package com.fixit.service;

import com.fixit.dto.BookingRequest;
import com.fixit.entity.*;
import com.fixit.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final WorkerRepository workerRepository;
    private final ServiceRepository serviceRepository;

    public Booking createBooking(BookingRequest req, String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail).orElseThrow(() -> new RuntimeException("Customer not found"));
        Worker worker = workerRepository.findById(req.getWorkerId()).orElseThrow(() -> new RuntimeException("Worker not found"));
        com.fixit.entity.Service service = serviceRepository.findById(req.getServiceId()).orElseThrow(() -> new RuntimeException("Service not found"));

        Booking booking = Booking.builder()
                .customer(customer).worker(worker).service(service)
                .scheduledAt(req.getScheduledAt()).address(req.getAddress())
                .city(req.getCity()).problemDescription(req.getProblemDescription())
                .status(Booking.BookingStatus.PENDING).build();
        return bookingRepository.save(booking);
    }

    public List<Booking> getMyBookings(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByCustomerIdOrderByCreatedAtDesc(user.getId());
    }

    public Booking updateStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(Booking.BookingStatus.valueOf(status.toUpperCase()));
        return bookingRepository.save(booking);
    }

    public Booking getById(Long id) {
    
    return bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
}

public List<Booking> getWorkerBookings(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Worker worker = workerRepository.findByUserId(user.getId())
            .orElseThrow(() -> new RuntimeException("Worker not found"));

    return bookingRepository
            .findByWorkerIdOrderByCreatedAtDesc(worker.getId());
}
}