package com.example.demo.controllers;

import com.example.demo.models.Debate;
import com.example.demo.models.Message;
import com.example.demo.services.DebateService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/api/debate")
@CrossOrigin(origins = "*")
public class DebateController {

    private final DebateService debateService;

    public DebateController(DebateService debateService) {
        this.debateService = debateService;
    }

    @PostMapping("/start")
    public Debate startDebate(@RequestBody Map<String, String> body) {
        String topic = body.get("topic");
        String stance = body.get("stance");
        String userId = body.get("userId");
        return debateService.startDebate(topic, stance, userId);
    }

    @PostMapping("/{id}/message")
    public Debate sendMessage(@PathVariable String id, @RequestBody Message message) {
        return debateService.sendMessage(id, message.getSender(), message.getBody());
    }

    @GetMapping("/{id}")
    public Debate getDebate(@PathVariable String id) {
        return debateService.getDebate(id)
                .orElseThrow(() -> new RuntimeException("Debate not found"));
    }

    @GetMapping("/all")
    public Collection<Debate> getAll() {
        return debateService.getAllDebates();
    }
}
