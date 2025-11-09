package com.example.demo.services;

import com.example.demo.models.Debate;
import com.example.demo.models.Message;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class DebateService {

    private final Map<String, Debate> debates = new ConcurrentHashMap<>();
    private final GeminiService geminiService;

    public DebateService(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    public Debate startDebate(String topic, String stance, String userId) {
        Debate debate = new Debate(UUID.randomUUID().toString(), topic, stance, userId, Instant.now(), new ArrayList<>());
        debates.put(debate.getId(), debate);
        return debate;
    }

    public Debate sendMessage(String debateId, String sender, String body) {
        Debate debate = debates.get(debateId);
        if (debate == null) throw new IllegalArgumentException("Debate not found");

        debate.getMessages().add(new Message(sender, body, Instant.now()));

        if ("USER".equalsIgnoreCase(sender)) {
            List<String> history = debate.getMessages().stream().map(Message::getBody).toList();
            String aiReply = geminiService.generateArgument(debate.getTopic(), debate.getStance(), history);
            debate.getMessages().add(new Message("AI", aiReply, Instant.now()));
        }

        return debate;
    }

    public Optional<Debate> getDebate(String id) {
        return Optional.ofNullable(debates.get(id));
    }

    public Collection<Debate> getAllDebates() {
        return debates.values();
    }
}
