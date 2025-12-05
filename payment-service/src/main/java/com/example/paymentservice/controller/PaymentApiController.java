package com.example.paymentservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentApiController {

    @PostMapping("/process")
    public ResponseEntity<Map<String, String>> processPayment(@RequestBody Map<String, Object> paymentRequest) {
        // Simulated payment processing - always succeeds
        Map<String, String> response = Map.of("status", "SUCCESS", "transactionId", "TXN" + System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
}
