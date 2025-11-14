package com.example.demo.models;

import java.util.List;

public class GeminiRequest {
    private String topic;
    private String stance;
    private List<String> history;

    public GeminiRequest() {}

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getStance() {
        return stance;
    }

    public void setStance(String stance) {
        this.stance = stance;
    }

    public List<String> getHistory() {
        return history;
    }

    public void setHistory(List<String> history) {
        this.history = history;
    }
}
