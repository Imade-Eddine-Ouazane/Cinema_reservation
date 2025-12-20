# Online Cinema Reservation System

This is a microservices-based online cinema reservation system built with Spring Boot. It consists of three services: film-service, reservation-service, and payment-service.

## Architecture

- **film-service** (Port 8181): Manages films and seat reservations using Spring Data REST.
- **reservation-service** (Port 8182): Handles reservations, communicates with film-service via FeignClient.
- **payment-service** (Port 8183): Processes payments using WebClient to a simulated payment API.

## Prerequisites

- Java 17
- Maven 3.6+
- Internet connection for Maven dependencies

## Setup and Running

1. Clone or navigate to the project directory.
2. Build the project: `mvn clean install`
3. Start each service in separate terminals:
   - Film Service: `java -jar film-service/target/film-service-0.0.1-SNAPSHOT.jar`
   - Reservation Service: `java -jar reservation-service/target/reservation-service-0.0.1-SNAPSHOT.jar`
   - Payment Service: `java -jar payment-service/target/payment-service-0.0.1-SNAPSHOT.jar`

## API Documentation (Swagger)

Once services are running, access Swagger UI for each service:

- Film Service: http://localhost:8181/swagger-ui/
- Reservation Service: http://localhost:8182/swagger-ui/
- Payment Service: http://localhost:8183/swagger-ui/

## Testing the System

### 1. Add a Film (Film Service)

**Endpoint:** POST http://localhost:8181/films

**Request Body:**

```json
{
  "title": "Inception",
  "description": "A mind-bending sci-fi thriller",
  "duration": 148,
  "availableSeats": 100
}
```

**Curl Command:**

```bash
curl -X POST http://localhost:8181/films \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","description":"A mind-bending sci-fi thriller","duration":148,"availableSeats":100}'
```

**Expected Response:** Film object with ID (e.g., ID: 1)

### 2. Get All Films (Film Service)

**Endpoint:** GET http://localhost:8181/films

**Curl Command:**

```bash
curl -X GET http://localhost:8181/films
```

**Expected Response:** List of films

### 3. Get Film by ID (Film Service)

**Endpoint:** GET http://localhost:8181/films/{id}

**Curl Command:**

```bash
curl -X GET http://localhost:8181/films/1
```

**Expected Response:** Film object with ID 1

### 4. Reserve Seats (Film Service)

**Endpoint:** POST http://localhost:8181/films/reserve

**Request Body:**

```json
{
  "filmId": 1,
  "numberOfSeats": 2
}
```

**Curl Command:**

```bash
curl -X POST http://localhost:8181/films/reserve \
  -H "Content-Type: application/json" \
  -d '{"filmId":1,"numberOfSeats":2}'
```

**Expected Response:** "Seats reserved successfully"

### 5. Create Reservation (Reservation Service)

**Endpoint:** POST http://localhost:8182/reservations?filmId=1&userId=1&numberOfSeats=2

**Curl Command:**

```bash
curl -X POST "http://localhost:8182/reservations?filmId=1&userId=1&numberOfSeats=2"
```

**Expected Response:** Reservation object with status "CONFIRMED"

### 6. Get All Reservations (Reservation Service)

**Endpoint:** GET http://localhost:8182/reservations

**Curl Command:**

```bash
curl -X GET http://localhost:8182/reservations
```

**Expected Response:** List of reservations

### 7. Process Payment (Payment Service)

**Endpoint:** POST http://localhost:8183/payments?reservationId=1&amount=20.0

**Curl Command:**

```bash
curl -X POST "http://localhost:8183/payments?reservationId=1&amount=20.0"
```

**Expected Response:** Payment object with status "COMPLETED"

### 8. Get All Payments (Payment Service)

**Endpoint:** GET http://localhost:8183/payments

**Curl Command:**

```bash
curl -X GET http://localhost:8183/payments
```

**Expected Response:** List of payments

## H2 Database Console

Access H2 console for each service:

- Film Service: http://localhost:8181/h2-console (JDBC URL: jdbc:h2:mem:filmdb)
- Reservation Service: http://localhost:8182/h2-console (JDBC URL: jdbc:h2:mem:reservationdb)
- Payment Service: http://localhost:8183/h2-console (JDBC URL: jdbc:h2:mem:paymentdb)

Username: sa, Password: password

## Error Scenarios

### Insufficient Seats

Try to reserve more seats than available:

```bash
curl -X POST http://localhost:8181/films/reserve \
  -H "Content-Type: application/json" \
  -d '{"filmId":1,"numberOfSeats":200}'
```

Expected: 400 Bad Request - "Not enough seats available"

### Non-existent Film

Try to reserve for a non-existent film:

```bash
curl -X POST http://localhost:8181/films/reserve \
  -H "Content-Type: application/json" \
  -d '{"filmId":999,"numberOfSeats":1}'
```

Expected: 404 Not Found

## Full Workflow Test

1. Add a film (Step 1)
2. Reserve seats (Step 4)
3. Create reservation (Step 5) - This will check availability and reserve seats
4. Process payment (Step 7)

This demonstrates the complete reservation flow with inter-service communication.




j'ai ajouter le demo et le raport dans un fichier docs