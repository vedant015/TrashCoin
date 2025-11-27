package com.trashcoin.backend.controller;

import com.trashcoin.backend.dto.PickupRequestDto;
import com.trashcoin.backend.service.PickupRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pickup-requests")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class PickupRequestController {
    
    @Autowired
    private PickupRequestService pickupRequestService;
    
    @PostMapping
    public ResponseEntity<PickupRequestDto> createPickupRequest(@RequestBody PickupRequestDto dto) {
        PickupRequestDto created = pickupRequestService.createPickupRequest(dto);
        return ResponseEntity.ok(created);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PickupRequestDto>> getUserPickupRequests(@PathVariable Long userId) {
        List<PickupRequestDto> requests = pickupRequestService.getUserPickupRequests(userId);
        return ResponseEntity.ok(requests);
    }
    
    @GetMapping
    public ResponseEntity<List<PickupRequestDto>> getAllPickupRequests() {
        List<PickupRequestDto> requests = pickupRequestService.getAllPickupRequests();
        return ResponseEntity.ok(requests);
    }
    
    @PatchMapping("/{requestId}/status")
    public ResponseEntity<PickupRequestDto> updatePickupStatus(
            @PathVariable Long requestId,
            @RequestBody Map<String, Object> updates) {
        
        String status = (String) updates.get("status");
        Integer coinsEarned = updates.containsKey("coinsEarned") ? 
            ((Number) updates.get("coinsEarned")).intValue() : null;
        
        PickupRequestDto updated = pickupRequestService.updatePickupStatus(requestId, status, coinsEarned);
        return ResponseEntity.ok(updated);
    }
}
