package com.example.demo.controllers;

import com.example.demo.models.User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final Map<String, User> users = new ConcurrentHashMap<>();

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        users.put(user.getId(), user);
        return user;
    }

    @GetMapping("/me/{id}")
    public User getUser(@PathVariable String id) {
        return users.get(id);
    }
}
