package com.example.reservationservice.client;

import com.example.reservationservice.dto.ReserveRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "film-service", url = "${film-service.url}")
public interface FilmServiceClient {

    @PostMapping("/films/reserve")
    String reserve(@RequestBody ReserveRequest request);
}
