package com.example.paymentservice.controller;

import com.example.paymentservice.model.Payment;
import com.example.paymentservice.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Mono<ResponseEntity<Payment>> processPayment(@RequestParam Long reservationId, @RequestParam double amount) {
        return paymentService.processPayment(reservationId, amount)
                .map(payment -> ResponseEntity.ok(payment))
                .onErrorReturn(ResponseEntity.badRequest().build());
    }
}
