# Deploy TrashCoin to Render.com

This guide walks you through deploying your full-stack TrashCoin application to Render.com.

## Prerequisites

- GitHub account
- Render.com account (sign up at https://render.com)
- Your code pushed to GitHub repository

## Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 2: Deploy MySQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"** (Render's MySQL is limited, PostgreSQL recommended)
   - OR use external MySQL like [PlanetScale](https://planetscale.com) (free tier)
3. If using Render PostgreSQL:
   - Name: `trashcoin-db`
   - Database: `trashcoin_db`
   - User: auto-generated
   - Region: Choose closest to you
   - Plan: **Free**
4. Click **"Create Database"**
5. Once created, copy the **Internal Database URL** (looks like: `postgresql://user:pass@host:5432/db`)

### Alternative: Use PlanetScale (MySQL)
1. Sign up at https://planetscale.com
2. Create new database: `trashcoin-db`
3. Get connection string from dashboard
4. Use this URL in backend environment variables

## Step 3: Deploy Backend (Spring Boot)

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure service:
   - **Name:** `trashcoin-backend`
   - **Region:** Same as database
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Docker`
   - **Instance Type:** Free

4. **Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   DATABASE_URL=<your-database-internal-url>
   DATABASE_USERNAME=<your-db-username>
   DATABASE_PASSWORD=<your-db-password>
   FRONTEND_URL=https://<your-frontend-url>.onrender.com
   ```
   
   **Note:** You'll update `FRONTEND_URL` after deploying frontend (Step 4)

5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes first time)
7. Once deployed, copy your backend URL: `https://trashcoin-backend.onrender.com`

### Important: Update application.properties for PostgreSQL (if using)

If you chose PostgreSQL instead of MySQL, update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

And add PostgreSQL driver to `backend/pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

## Step 4: Deploy Frontend (React/Vite)

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name:** `trashcoin-frontend`
   - **Branch:** `main`
   - **Root Directory:** `green-bin-connect`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. **Environment Variables:**
   ```
   VITE_API_URL=https://trashcoin-backend.onrender.com/api
   ```

5. Click **"Create Static Site"**
6. Wait for deployment (3-5 minutes)
7. Your frontend will be live at: `https://trashcoin-frontend.onrender.com`

## Step 5: Update CORS

1. Go back to your **Backend Service** on Render
2. Update the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://trashcoin-frontend.onrender.com
   ```
3. Click **"Save Changes"** (backend will auto-redeploy)

## Step 6: Test Your Application

1. Visit your frontend URL: `https://trashcoin-frontend.onrender.com`
2. Test signup/login
3. Test creating pickup requests
4. Test admin dashboard (login with admin@trashcoin.com / admin123)

## Important Notes

### Free Tier Limitations
- **Backend:** Spins down after 15 minutes of inactivity (first request takes ~30 seconds)
- **Database:** 90 days free, then $7/month for PostgreSQL
- **Frontend:** Always on, no spin-down

### Custom Domain (Optional)
1. In Render, go to your Static Site
2. Click **"Custom Domains"**
3. Add your domain and follow DNS instructions

### SSL/HTTPS
- Render automatically provides SSL certificates
- All sites are HTTPS by default

## Monitoring

- View logs: Click on service → "Logs" tab
- Check health: Visit `https://trashcoin-backend.onrender.com/api/health`
- Database: View metrics in database dashboard

## Troubleshooting

### Backend won't start
- Check logs for errors
- Verify DATABASE_URL is correct
- Ensure all environment variables are set

### CORS errors
- Verify FRONTEND_URL matches your frontend domain
- Check backend logs for CORS messages

### Database connection fails
- Verify database is running
- Check DATABASE_URL format
- Ensure database credentials are correct

### Frontend can't reach backend
- Verify VITE_API_URL is correct
- Check backend is running and healthy
- Look for CORS errors in browser console

## Upgrading to Paid Plans

For production use, consider:
- **Backend:** $7/month (no spin-down)
- **Database:** $7/month (PostgreSQL) or use PlanetScale
- **CDN:** Included in frontend static site

## Alternative: Single Docker Container

If you want to run both frontend and backend together, create a `docker-compose.yml` and deploy to Render as a single service (requires paid plan).

---

## Quick Reference

**Backend API:** `https://trashcoin-backend.onrender.com`  
**Frontend:** `https://trashcoin-frontend.onrender.com`  
**Health Check:** `https://trashcoin-backend.onrender.com/api/health`

**Environment Variables Required:**

Backend:
- `DATABASE_URL`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `FRONTEND_URL`

Frontend:
- `VITE_API_URL`

---

Need help? Check Render docs: https://render.com/docs
