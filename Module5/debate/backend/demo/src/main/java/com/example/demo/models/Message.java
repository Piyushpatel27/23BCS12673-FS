package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private String sender;  // "USER" or "AI"
    private String body;
    private Instant createdAt = Instant.now();
}
