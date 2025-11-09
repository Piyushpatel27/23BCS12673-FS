package com.example.demo.controllers;

import com.example.demo.services.GeminiService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173") // ✅ change port if your React app runs elsewhere
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/send")
    public Map<String, String> sendMessage(@RequestBody Map<String, Object> payload) {
        String topic = (String) payload.get("topic");
        String stance = (String) payload.get("stance");
        List<String> history = (List<String>) payload.get("history");

        // Call Gemini service
        String reply = geminiService.generateArgument(topic, stance, history);

        return Map.of("reply", reply);
    }

    @GetMapping("/ping")
    public String ping() {
        return "Chat service active";
    }
}
