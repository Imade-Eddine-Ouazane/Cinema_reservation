package com.example.paymentservice.service;

import com.example.paymentservice.model.Payment;
import com.example.paymentservice.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    private final WebClient webClient = WebClient.create("http://localhost:8183");

    public Mono<Payment> processPayment(Long reservationId, double amount) {
        // Call simulated payment API
        return webClient.post()
                .uri("/api/payment/process")
                .bodyValue(Map.of("reservationId", reservationId, "amount", amount))
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    String status = (String) response.get("status");
                    if ("SUCCESS".equals(status)) {
                        Payment payment = new Payment(reservationId, amount, "COMPLETED");
                        return paymentRepository.save(payment);
                    } else {
                        Payment payment = new Payment(reservationId, amount, "FAILED");
                        return paymentRepository.save(payment);
                    }
                });
    }
}
