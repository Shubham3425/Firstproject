package com.fixit.repository;

import com.fixit.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {
    Optional<Worker> findByUserId(Long userId);
    List<Worker> findByServiceIdAndStatus(Long serviceId, Worker.WorkerStatus status);
    List<Worker> findByCityAndStatus(String city, Worker.WorkerStatus status);

    @Query("SELECT w FROM Worker w WHERE w.service.id = :serviceId AND w.city = :city AND w.status = 'ACTIVE'")
    List<Worker> findByServiceAndCity(@Param("serviceId") Long serviceId, @Param("city") String city);

    @Query("SELECT w FROM Worker w WHERE w.status = 'ACTIVE' ORDER BY w.avgRating DESC")
    List<Worker> findTopRatedWorkers();
}
