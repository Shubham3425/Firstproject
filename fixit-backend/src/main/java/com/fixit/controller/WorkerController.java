package com.fixit.controller;

import com.fixit.dto.WorkerCreateRequest;
import com.fixit.entity.Worker;
import com.fixit.service.WorkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
@RequiredArgsConstructor
public class WorkerController {

    private final WorkerService workerService;

    @PostMapping
    public ResponseEntity<Worker> createWorker(
            @RequestBody WorkerCreateRequest request) {
        return ResponseEntity.ok(workerService.createWorker(request));
    }

    @GetMapping("/top")
    public ResponseEntity<List<Worker>> getTopWorkers() {
        return ResponseEntity.ok(workerService.getTopRated());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Worker>> search(
            @RequestParam(required = false) Long serviceId,
            @RequestParam(required = false) String city) {
        return ResponseEntity.ok(workerService.searchWorkers(serviceId, city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Worker> getWorker(@PathVariable Long id) {
        return ResponseEntity.ok(workerService.getById(id));
    }
}