package com.example.filmservice.dto;

public class ReserveRequest {

    private Long filmId;
    private int numberOfSeats;

    // Constructors
    public ReserveRequest() {
    }

    public ReserveRequest(Long filmId, int numberOfSeats) {
        this.filmId = filmId;
        this.numberOfSeats = numberOfSeats;
    }

    // Getters and Setters
    public Long getFilmId() {
        return filmId;
    }

    public void setFilmId(Long filmId) {
        this.filmId = filmId;
    }

    public int getNumberOfSeats() {
        return numberOfSeats;
    }

    public void setNumberOfSeats(int numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }
}
