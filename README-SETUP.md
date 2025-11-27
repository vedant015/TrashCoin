# TrashCoin - Setup Guide

## Prerequisites
- Docker Desktop installed and running
- Node.js and npm installed
- Java 17+ and Maven installed

## Quick Start

### 1. Start MySQL in Docker

Open a terminal in the TrashCoin root directory and run:

```powershell
docker-compose up -d
```

This will start MySQL on port 3307 with:
- Database: `trashcoin_db`
- Root password: `rootpassword`
- User: `trashcoin` / Password: `trashcoin123`

To check if MySQL is running:
```powershell
docker ps
```

To view MySQL logs:
```powershell
docker logs trashcoin-mysql
```

### 2. Start Backend (Spring Boot)

Open a new terminal:

```powershell
cd backend
mvn spring-boot:run
```

The backend will start on **http://localhost:8081**

API Endpoints:
- Health Check: `http://localhost:8081/api/health`
- Auth: `http://localhost:8081/api/auth/login`, `/signup`
- Pickup Requests: `http://localhost:8081/api/pickup-requests`

### 3. Start Frontend (Vite + React)

Open another terminal:

```powershell
cd green-bin-connect
npm run dev
```

The frontend will start on **http://localhost:8080**

## Stopping Services

### Stop Frontend
Press `Ctrl+C` in the terminal running npm

### Stop Backend
Press `Ctrl+C` in the terminal running Maven

### Stop MySQL
```powershell
docker-compose down
```

To stop and remove data:
```powershell
docker-compose down -v
```

## Troubleshooting

### MySQL Connection Issues
1. Make sure Docker Desktop is running
2. Check if MySQL container is running: `docker ps`
3. Check MySQL logs: `docker logs trashcoin-mysql`
4. Restart MySQL: `docker-compose restart mysql`

### Backend Won't Start
1. Make sure MySQL is running first
2. Check port 8081 is not in use: `netstat -ano | findstr :8081`
3. Check backend logs for errors

### Frontend Issues
1. Make sure port 8080 is not in use
2. Run `npm install` if node_modules are missing
3. Check browser console for errors

## Database Access

To access MySQL directly:

```powershell
docker exec -it trashcoin-mysql mysql -u root -p
# Enter password: rootpassword
```

Then you can run SQL commands:
```sql
USE trashcoin_db;
SHOW TABLES;
SELECT * FROM users;
```

## Architecture

```
┌─────────────────┐
│   Frontend      │  http://localhost:8080
│  (Vite+React)   │
└────────┬────────┘
         │
         │ API Calls
         │
┌────────▼────────┐
│    Backend      │  http://localhost:8081
│  (Spring Boot)  │
└────────┬────────┘
         │
         │ JDBC
         │
┌────────▼────────┐
│     MySQL       │  port 3307
│   (Docker)      │
└─────────────────┘
```
