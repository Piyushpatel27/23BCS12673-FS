package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Debate {
    private String id;
    private String topic;
    private String stance;
    private String userId;
    private Instant createdAt = Instant.now();
    private List<Message> messages = new ArrayList<>();
}
