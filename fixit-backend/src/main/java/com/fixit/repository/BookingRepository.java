package com.fixit.repository;

import com.fixit.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<Booking> findByWorkerIdOrderByCreatedAtDesc(Long workerId);
    List<Booking> findByWorkerIdAndStatus(Long workerId, Booking.BookingStatus status);
}
