package com.trashcoin.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PickupRequestDto {
    private Long id;
    private Long userId;
    private String address;
    private String wasteType;
    private Double estimatedWeight;
    private LocalDateTime preferredDate;
    private String status;
    private Integer coinsEarned;
    private String notes;
    private LocalDateTime createdAt;
}
