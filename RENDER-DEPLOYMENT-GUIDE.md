# 🚀 Deploy TrashCoin to Render.com (Full Render Stack)

Complete guide to deploy both frontend and backend on Render.com with Render's PostgreSQL database.

---

## 📋 Prerequisites

- GitHub account with TrashCoin repository pushed
- Render.com account (free) - Sign up at https://render.com

---

## Step 1: Create Render Account

1. Go to https://render.com
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign in with GitHub"**
4. Authorize Render to access your repositories

---

## Step 2: Create PostgreSQL Database

1. In Render Dashboard, click **"New +"** (top right)
2. Select **"PostgreSQL"**

3. **Configure Database:**
   ```
   Name: trashcoin-db
   Database: trashcoin_db
   User: (auto-generated)
   Region: Oregon (US West) - or closest to you
   PostgreSQL Version: 16
   Datadog API Key: (leave empty)
   Plan: Free
   ```

4. Click **"Create Database"**

5. **Wait 1-2 minutes** for database to be created

6. **Copy Connection Details:**
   - Click on your database name
   - Scroll to **"Connections"** section
   - Copy the **"Internal Database URL"**
   - It looks like: `postgresql://user:password@host:5432/database`
   - **Save this URL** - you'll need it in Step 3!

---

## Step 3: Deploy Backend (Spring Boot)

1. In Render Dashboard, click **"New +"** → **"Web Service"**

2. **Connect GitHub Repository:**
   - If first time: Click "Connect account" → Authorize Render
   - Click **"Connect repository"**
   - Search and select: **`vedant015/TrashCoin`**
   - Click **"Connect"**

3. **Configure Web Service:**
   ```
   Name: trashcoin-backend
   Region: Oregon (US West) - SAME as database!
   Branch: master
   Root Directory: backend
   Runtime: Docker
   Instance Type: Free
   ```

4. **Add Environment Variables:**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Add **ONE variable**:
   
   ```
   DATABASE_URL
   Value: <paste your Internal Database URL from Step 2>
   ```
   
   **Important:** 
   - Use the **Internal Database URL** (not External)
   - The URL format `postgresql://user:pass@host:5432/db` is automatically converted by the app
   - Username and password are included in the URL, no need for separate variables

5. **Auto-Deploy:** Leave enabled (deploys on every git push)

6. Click **"Create Web Service"**

7. **Wait for Deployment (5-10 minutes)**
   - Watch the logs in real-time
   - Status should turn to **"Live"** with green checkmark
   - Copy your backend URL: `https://trashcoin-backend.onrender.com`

8. **Test Backend:**
   - Visit: `https://trashcoin-backend.onrender.com/api/health`
   - Should return: `{"status":"UP"}`

---

## Step 4: Deploy Frontend (React/Vite)

1. In Render Dashboard, click **"New +"** → **"Static Site"**

2. **Connect Repository:** Select `vedant015/TrashCoin` (should already be connected)

3. **Configure Static Site:**
   ```
   Name: trashcoin-frontend
   Branch: master
   Root Directory: green-bin-connect
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variable:**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   ```
   VITE_API_URL
   Value: https://trashcoin-backend.onrender.com/api
   ```
   
   **Replace with YOUR actual backend URL from Step 3!**

5. **Auto-Publish:** Leave enabled

6. Click **"Create Static Site"**

7. **Wait for Deployment (3-5 minutes)**
   - Status should turn to **"Live"**
   - Copy your frontend URL: `https://trashcoin-frontend.onrender.com`

---

## Step 5: Update Backend CORS

Now that frontend is deployed, update backend to accept requests from it:

1. Go to your **Backend Service** (trashcoin-backend)
2. Click **"Environment"** in left sidebar
3. Click **"Add Environment Variable"**
4. Add:
   ```
   FRONTEND_URL
   Value: https://trashcoin-frontend.onrender.com
   ```
   **Replace with YOUR actual frontend URL!**

5. Click **"Save Changes"**
6. Backend will **auto-redeploy** (~2-3 minutes)

---

## Step 6: Test Your Live Application! 🎉

1. **Visit your frontend:** `https://trashcoin-frontend.onrender.com`

2. **Test Full Flow:**
   - ✅ Click **"Sign Up"** → Create account
   - ✅ Login with your account
   - ✅ Click **"Request Pickup"** → Submit request
   - ✅ Logout
   - ✅ Login as admin: 
     - Email: `admin@trashcoin.com`
     - Password: `admin123`
   - ✅ Go to **"Dashboard"** → See pending request
   - ✅ Change status to **"Completed"** → Award coins
   - ✅ Logout and login as your user
   - ✅ Check **"Dashboard"** or **"Rewards"** → See your earned coins!

---

## 📊 Your Live URLs

Once deployed, save these:

- **Frontend:** `https://trashcoin-frontend.onrender.com`
- **Backend API:** `https://trashcoin-backend.onrender.com`
- **Health Check:** `https://trashcoin-backend.onrender.com/api/health`
- **Database:** (accessible only from backend)

---

## ⚠️ Important Notes

### Free Tier Limitations:

1. **Backend Service (Free):**
   - ✅ 750 hours/month (more than enough)
   - ⚠️ **Spins down after 15 minutes of inactivity**
   - ⏱️ First request after sleep takes ~30-50 seconds
   - ♻️ Auto-wakes on any request

2. **PostgreSQL Database (Free):**
   - ✅ First 90 days completely free
   - ⚠️ After 90 days: **$7/month** (paid plan required)
   - ✅ 1GB storage, 100 connections
   - 💾 Auto-backups not included in free tier

3. **Static Site (Free Forever):**
   - ✅ Unlimited bandwidth
   - ✅ Always on (no spin-down)
   - ✅ Auto-deployed on git push
   - ✅ Free SSL certificate

### Recommendations:

- **For Development:** Keep using local MySQL (free forever)
- **For Production:** Consider upgrading backend to $7/month (no spin-down)
- **For Database:** After 90 days, either:
  - Pay $7/month for Render PostgreSQL
  - Migrate to PlanetScale (free forever, MySQL)
  - Use AWS RDS free tier (12 months)

---

## 🔧 Monitoring & Maintenance

### View Logs:
1. Go to your service in Render Dashboard
2. Click **"Logs"** tab
3. See real-time application logs

### View Database:
1. Go to your database in Render Dashboard
2. Click **"Connect"** → Get connection string
3. Use TablePlus, DBeaver, or psql to connect

### Redeploy:
- **Auto:** Push to GitHub → Auto-deploys
- **Manual:** Click "Manual Deploy" → "Deploy latest commit"

### Check Status:
- Green checkmark = Live and healthy
- Red X = Failed deployment (check logs)
- Yellow = Building/Deploying

---

## 🐛 Troubleshooting

### Backend Won't Start?

**Check Logs:**
```
Click Backend Service → Logs tab
```

**Common Issues:**
- ❌ DATABASE_URL not set → Add environment variable
- ❌ Wrong PostgreSQL URL format → Copy from database "Internal Database URL"
- ❌ Build failed → Check Java version (should be 17)

### Frontend Can't Connect to Backend?

**Check:**
1. VITE_API_URL includes `/api` at end
2. Backend URL is correct and accessible
3. Backend shows "Live" status
4. CORS is configured (FRONTEND_URL set in backend)

**Test Backend Directly:**
```
Visit: https://YOUR-BACKEND.onrender.com/api/health
Should return: {"status":"UP"}
```

### CORS Errors in Browser Console?

**Solution:**
1. Go to Backend Service → Environment
2. Verify FRONTEND_URL matches exactly (no trailing slash)
3. Example: `https://trashcoin-frontend.onrender.com`
4. Save and wait for auto-redeploy

### Database Connection Failed?

**Check:**
1. Database shows "Available" status
2. DATABASE_URL is the **Internal** URL (not External)
3. Backend and Database are in **same region**

### Slow First Request After Inactivity?

**This is normal on free tier!**
- Free backend spins down after 15 minutes
- First request wakes it up (~30 seconds)
- Upgrade to $7/month to prevent spin-down

---

## 💰 Cost Breakdown

| Service | Free Tier | After Free |
|---------|-----------|------------|
| Static Site (Frontend) | ✅ Free Forever | Free Forever |
| Web Service (Backend) | ✅ 750 hrs/month | $7/month (no spin-down) |
| PostgreSQL Database | ✅ 90 days free | $7/month |
| **Total First 90 Days** | **$0/month** | - |
| **Total After 90 Days** | **$7/month** | $14/month (no spin-down) |

---

## 🚀 Next Steps

### Optional Improvements:

1. **Custom Domain:**
   - Go to Static Site → Settings → Custom Domain
   - Add your domain (e.g., trashcoin.com)
   - Update DNS records as instructed

2. **Environment-Based Config:**
   - Add `.env.production` for production settings
   - Keep `.env.development` for local development

3. **Monitoring:**
   - Set up uptime monitoring (UptimeRobot free)
   - Enable Render's notification webhooks

4. **Optimize Performance:**
   - Add Redis caching (Render addon)
   - Enable CDN for static assets
   - Implement database connection pooling

---

## 📚 Resources

- **Render Docs:** https://render.com/docs
- **PostgreSQL Guide:** https://render.com/docs/databases
- **Static Sites:** https://render.com/docs/static-sites
- **Web Services:** https://render.com/docs/web-services

---

## ✅ Deployment Checklist

- [ ] Render account created
- [ ] PostgreSQL database created and running
- [ ] Backend deployed and showing "Live"
- [ ] Backend health check returns success
- [ ] Frontend deployed and showing "Live"
- [ ] FRONTEND_URL added to backend environment
- [ ] Can access frontend in browser
- [ ] Can create account and login
- [ ] Can create pickup requests
- [ ] Admin can approve requests
- [ ] Coins are awarded correctly
- [ ] User can see earned coins

---

🎉 **Congratulations! Your TrashCoin app is now live on the internet!** 🎉

Share your URL: `https://trashcoin-frontend.onrender.com`
