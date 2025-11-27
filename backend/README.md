# TrashCoin Backend API

Spring Boot backend for the TrashCoin application.

## Technology Stack
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- MySQL Database
- Lombok
- Maven

## Prerequisites
- JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup Instructions

1. **Configure Database**
   - Install MySQL
   - Create database (will auto-create if not exists):
   ```sql
   CREATE DATABASE trashcoin_db;
   ```

2. **Update application.properties**
   - Set your MySQL username and password in `src/main/resources/application.properties`

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

5. **Access the API**
   - Backend runs on: http://localhost:8081
   - Health check: http://localhost:8081/api/health

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

## Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/trashcoin/backend/
│   │   │   ├── config/           # Configuration classes
│   │   │   ├── controller/       # REST Controllers
│   │   │   ├── model/            # Entity models
│   │   │   ├── repository/       # JPA Repositories
│   │   │   ├── service/          # Business logic
│   │   │   └── TrashcoinBackendApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Development Notes
- CORS is enabled for localhost:8080 (frontend) and localhost:3000
- CSRF is disabled for API development
- All /api/** endpoints are publicly accessible (update SecurityConfig for production)
