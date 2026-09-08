# FixIt Backend - Spring Boot + MySQL

## Requirements
- Java 17+
- Maven 3.8+
- MySQL 8+

## Setup

### 1. Create MySQL Database
```sql
CREATE DATABASE fixit_db;
```

### 2. Update application.properties
Edit `src/main/resources/application.properties`:
```
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

Server starts on: http://localhost:8080

## API Endpoints

### Auth (Public)
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login & get JWT token |

### Services (Public)
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/services | Get all active services |
| GET | /api/services/{id} | Get service by ID |

### Workers (Public)
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/workers/top | Get top rated workers |
| GET | /api/workers/search?serviceId=1&city=Nagpur | Search workers |
| GET | /api/workers/{id} | Get worker by ID |

### Bookings (Requires JWT)
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/bookings | Create a booking |
| GET | /api/bookings/my | Get my bookings |
| GET | /api/bookings/{id} | Get booking by ID |
| PATCH | /api/bookings/{id}/status?status=CONFIRMED | Update status |

### Reviews (Requires JWT)
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/reviews | Add a review |
| GET | /api/reviews/worker/{workerId} | Get worker reviews |

## Authentication
Add JWT token to request header:
```
Authorization: Bearer <your_token>
```

## Sample Register Request
```json
POST /api/auth/register
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "password123",
  "phone": "9876543210",
  "city": "Nagpur",
  "role": "CUSTOMER"
}
```

## Sample Booking Request
```json
POST /api/bookings
Authorization: Bearer <token>
{
  "workerId": 1,
  "serviceId": 1,
  "scheduledAt": "2026-09-01T10:00:00",
  "address": "123 MG Road, Nagpur",
  "city": "Nagpur",
  "problemDescription": "Pipe leaking in bathroom"
}
```
