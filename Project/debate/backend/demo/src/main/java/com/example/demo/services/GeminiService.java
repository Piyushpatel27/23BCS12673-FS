package com.example.demo.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    // ✅ Gemini 2.5 Pro endpoints
    private static final String ARGUMENT_URL =
            "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent";
    private static final String ANALYSIS_URL =
            "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent";

    /**
     * Generate a debate argument based on topic, stance, and optional history
     */
    public String generateArgument(String topic, String stance, List<String> history) {
        RestTemplate restTemplate = new RestTemplate();

        String previous = (history != null && !history.isEmpty())
                ? String.join("\n", history)
                : "No previous discussion.";

        String text = String.format(
                "You are debating on the topic '%s'. Your stance is '%s'.\n"
                + "Previous discussion:\n%s\n\nNow generate your next strong argument clearly and concisely.",
                topic, stance, previous
        );

        return callGeminiAPI(ARGUMENT_URL, text, restTemplate);
    }

    /**
     * Analyze an argument for logic, persuasiveness, and tone
     */
    public String analyzeArgument(String argument) {
        RestTemplate restTemplate = new RestTemplate();

        String text = String.format(
                "Analyze the following argument for clarity, logic, persuasiveness, and tone. Provide a concise analysis:\n\n%s",
                argument
        );

        return callGeminiAPI(ANALYSIS_URL, text, restTemplate);
    }

    /**
     * Internal method to call Gemini API with correct JSON structure
     */
    private String callGeminiAPI(String url, String text, RestTemplate restTemplate) {
        // ✅ Correct payload for Gemini 2.5 Pro
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", text)))
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        String fullUrl = url + "?key=" + apiKey;

        try {
            Map<String, Object> response = restTemplate.postForObject(fullUrl, entity, Map.class);

            if (response != null && response.containsKey("candidates")) {
                Map<String, Object> candidate = ((List<Map<String, Object>>) response.get("candidates")).get(0);
                if (candidate.containsKey("content")) {
                    Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (!parts.isEmpty() && parts.get(0).containsKey("text")) {
                        return parts.get(0).get("text").toString();
                    }
                }
            }
            return "⚠️ No valid response from Gemini.";

        } catch (Exception e) {
            e.printStackTrace();
            return "⚠️ Error calling Gemini API: " + e.getMessage();
        }
    }
}
