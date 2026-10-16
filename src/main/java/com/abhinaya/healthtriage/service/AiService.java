package com.abhinaya.healthtriage.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class AiService {

    @Value("${gemini.api.key:}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    public String explain(String level, String doctor) {

        // Safe fallback explanation
        String fallback = """
                Your assessment indicates a %s risk level.

                Based on the assessment, the recommended doctor is a %s.

                Please remember that this result is only an initial assessment
                and does not replace professional medical advice.
                """.formatted(level, doctor);

        // If Gemini API key is missing, use fallback
        if (apiKey == null || apiKey.isBlank()) {
            return fallback;
        }

        String prompt = """
                Explain this health assessment in simple English.
                Do not diagnose the patient.
                Give general guidance only.

                Risk Level: %s
                Recommended Doctor: %s
                """.formatted(level, doctor);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
        );

        try {

            Map<?, ?> response = restClient.post()
                    .uri(
                            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                                    + apiKey
                    )
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(Map.class);

            if (response == null) {
                return fallback;
            }

            Object candidatesObject = response.get("candidates");

            if (!(candidatesObject instanceof List<?> candidates)
                    || candidates.isEmpty()) {
                return fallback;
            }

            Object candidateObject = candidates.get(0);

            if (!(candidateObject instanceof Map<?, ?> candidate)) {
                return fallback;
            }

            Object contentObject = candidate.get("content");

            if (!(contentObject instanceof Map<?, ?> content)) {
                return fallback;
            }

            Object partsObject = content.get("parts");

            if (!(partsObject instanceof List<?> parts)
                    || parts.isEmpty()) {
                return fallback;
            }

            Object firstPartObject = parts.get(0);

            if (!(firstPartObject instanceof Map<?, ?> firstPart)) {
                return fallback;
            }

            Object text = firstPart.get("text");

            if (text == null || text.toString().isBlank()) {
                return fallback;
            }

            return text.toString();

        } catch (Exception e) {

            System.out.println("Gemini API unavailable: " + e.getMessage());

            return fallback;
        }
    }
}