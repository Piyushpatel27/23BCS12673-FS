package com.example.demo.controllers;

import com.example.demo.models.GeminiRequest;
import com.example.demo.services.GeminiService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/argument")
    public Map<String, String> generateArgument(@RequestBody GeminiRequest request) {
        String reply = geminiService.generateArgument(
                request.getTopic(),
                request.getStance(),
                request.getHistory()
        );
        return Map.of("reply", reply); // ✅ Send JSON response
    }

    @GetMapping("/ping")
    public String ping() {
        return "Gemini service is active";
    }
}
