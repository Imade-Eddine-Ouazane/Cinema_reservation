package com.example.filmservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private int duration; // in minutes
    private int availableSeats;

    // Constructors
    public Film() {
    }

    public Film(String title, String description, int duration, int availableSeats) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.availableSeats = availableSeats;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }
}
