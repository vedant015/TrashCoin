package com.trashcoin.backend.service;

import com.trashcoin.backend.dto.PickupRequestDto;
import com.trashcoin.backend.model.PickupRequest;
import com.trashcoin.backend.model.User;
import com.trashcoin.backend.repository.PickupRequestRepository;
import com.trashcoin.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PickupRequestService {
    
    @Autowired
    private PickupRequestRepository pickupRequestRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public PickupRequestDto createPickupRequest(PickupRequestDto dto) {
        User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        PickupRequest pickupRequest = new PickupRequest();
        pickupRequest.setUser(user);
        pickupRequest.setAddress(dto.getAddress());
        pickupRequest.setWasteType(dto.getWasteType());
        pickupRequest.setEstimatedWeight(dto.getEstimatedWeight());
        pickupRequest.setPreferredDate(dto.getPreferredDate());
        pickupRequest.setNotes(dto.getNotes());
        pickupRequest.setStatus("pending");
        
        pickupRequest = pickupRequestRepository.save(pickupRequest);
        
        return convertToDto(pickupRequest);
    }
    
    public List<PickupRequestDto> getUserPickupRequests(Long userId) {
        List<PickupRequest> requests = pickupRequestRepository.findByUserId(userId);
        return requests.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    public List<PickupRequestDto> getAllPickupRequests() {
        List<PickupRequest> requests = pickupRequestRepository.findAll();
        return requests.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    public PickupRequestDto updatePickupStatus(Long requestId, String status, Integer coinsEarned) {
        PickupRequest request = pickupRequestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Pickup request not found"));
        
        request.setStatus(status);
        
        if (coinsEarned != null && "completed".equals(status)) {
            request.setCoinsEarned(coinsEarned);
            
            // Update user's coins
            User user = request.getUser();
            user.setCoinsEarned(user.getCoinsEarned() + coinsEarned);
            userRepository.save(user);
        }
        
        request = pickupRequestRepository.save(request);
        
        return convertToDto(request);
    }
    
    private PickupRequestDto convertToDto(PickupRequest request) {
        PickupRequestDto dto = new PickupRequestDto();
        dto.setId(request.getId());
        dto.setUserId(request.getUser().getId());
        dto.setAddress(request.getAddress());
        dto.setWasteType(request.getWasteType());
        dto.setEstimatedWeight(request.getEstimatedWeight());
        dto.setPreferredDate(request.getPreferredDate());
        dto.setStatus(request.getStatus());
        dto.setCoinsEarned(request.getCoinsEarned());
        dto.setNotes(request.getNotes());
        dto.setCreatedAt(request.getCreatedAt());
        return dto;
    }
}
