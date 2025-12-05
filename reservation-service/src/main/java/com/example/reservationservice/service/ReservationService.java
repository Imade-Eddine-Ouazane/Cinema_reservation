package com.example.reservationservice.service;

import com.example.reservationservice.client.FilmServiceClient;
import com.example.reservationservice.dto.ReserveRequest;
import com.example.reservationservice.model.Reservation;
import com.example.reservationservice.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private FilmServiceClient filmServiceClient;

    public Reservation createReservation(Long filmId, Long userId, int numberOfSeats) {
        // Check availability and reserve seats via film-service
        ReserveRequest request = new ReserveRequest(filmId, numberOfSeats);
        String response = filmServiceClient.reserve(request);
        if (response == null || response.contains("error") || response.contains("failed")) {
            throw new RuntimeException("Failed to reserve seats: " + response);
        }

        // Create reservation
        Reservation reservation = new Reservation(filmId, userId, numberOfSeats, "CONFIRMED");
        return reservationRepository.save(reservation);
    }
}
