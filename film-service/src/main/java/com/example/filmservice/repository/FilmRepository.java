package com.example.filmservice.repository;

import com.example.filmservice.model.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface FilmRepository extends JpaRepository<Film, Long> {
}
