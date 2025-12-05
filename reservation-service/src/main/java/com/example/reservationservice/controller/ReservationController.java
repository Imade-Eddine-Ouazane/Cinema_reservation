package com.example.reservationservice.controller;

import com.example.reservationservice.model.Reservation;
import com.example.reservationservice.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestParam Long filmId, @RequestParam Long userId, @RequestParam int numberOfSeats) {
        try {
            Reservation reservation = reservationService.createReservation(filmId, userId, numberOfSeats);
            return ResponseEntity.ok(reservation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
