package com.example.filmservice.controller;

import com.example.filmservice.dto.ReserveRequest;
import com.example.filmservice.model.Film;
import com.example.filmservice.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/films")
public class FilmController {

    @Autowired
    private FilmRepository filmRepository;

    @PostMapping("/reserve")
    public ResponseEntity<String> reserveSeats(@RequestBody ReserveRequest request) {
        Film film = filmRepository.findById(request.getFilmId()).orElse(null);
        if (film == null) {
            return ResponseEntity.notFound().build();
        }
        if (film.getAvailableSeats() < request.getNumberOfSeats()) {
            return ResponseEntity.badRequest().body("Not enough seats available");
        }
        film.setAvailableSeats(film.getAvailableSeats() - request.getNumberOfSeats());
        filmRepository.save(film);
        return ResponseEntity.ok("Seats reserved successfully");
    }
}
