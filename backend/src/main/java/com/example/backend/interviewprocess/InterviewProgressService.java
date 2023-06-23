package com.example.backend.interviewprocess;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewProgressService {

    private final InterviewProgressMapper progressMapper;

    public List<QuestionResponse> getQuestionList(Long id) {
        return progressMapper.getRandomQuestion(id);
    }

    public Object getDetectionTemplate(){
        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:8888/")
                .path("interview/progress")
                .encode()
                .build()
                .toUri();
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, String.class);
    }

    public Object getDetectionResult() {
        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:8888/")
                .path("interview/end")
                .encode()
                .build()
                .toUri();
        RestTemplate restTemplate = new RestTemplate();
        Gson gson = new GsonBuilder().disableHtmlEscaping().create();
        String json = gson.toJson(restTemplate.getForObject(uri, String.class));
        return gson.fromJson(json, String.class);
    }
}