package com.fixit.service;

import com.fixit.dto.WorkerCreateRequest;
import com.fixit.entity.User;
import com.fixit.entity.Worker;
import com.fixit.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkerService {

    private final WorkerRepository workerRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    public List<Worker> getTopRated() {
        return workerRepository.findTopRatedWorkers();
    }

    public List<Worker> searchWorkers(Long serviceId, String city) {
        if (serviceId != null && city != null)
            return workerRepository.findByServiceAndCity(serviceId, city);

        if (serviceId != null)
            return workerRepository.findByServiceIdAndStatus(
                    serviceId, Worker.WorkerStatus.ACTIVE);

        if (city != null)
            return workerRepository.findByCityAndStatus(
                    city, Worker.WorkerStatus.ACTIVE);

        return workerRepository.findAll();
    }

    public Worker getById(Long id) {
        return workerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Worker not found"));
    }

    public void updateRating(Long workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        Double avg = reviewRepository.findAvgRatingByWorkerId(workerId);

        worker.setAvgRating(avg != null ? avg : 0.0);
        workerRepository.save(worker);
    }

    public Worker createWorker(WorkerCreateRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.fixit.entity.Service service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        Worker worker = Worker.builder()
                .user(user)
                .service(service)
                .bio(request.getBio())
                .experienceYears(request.getExperienceYears())
                .hourlyRate(request.getHourlyRate())
                .city(request.getCity())
                .build();

        return workerRepository.save(worker);
    }
}