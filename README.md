# Store Ratings App

## Tech Stack
- **Frontend**: React + Redux + Ant Design
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Prisma
- **Auth**: JWT

## Backend Setup
1. Install dependencies:
```bash
cd backend
npm install express prisma @prisma/client bcryptjs jsonwebtoken cors dotenv

2 Configure .env:
DATABASE_URL="postgresql://user:password@localhost:5432/storeratings"
JWT_SECRET="your_jwt_secret_here"
PORT=5000

3 Initialize Prisma:
npx prisma init
npx prisma migrate dev

4 Start server:
npm start

Frontend Setup :
1 Install dependencies:
cd frontend
npm install @reduxjs/toolkit react-redux axios antd react-icons react-router-dom

2 Configure .env :
REACT_APP_API_URL=http://localhost:5000

3 Start front:
npm run start

# Run APP Concurrently (Frontend & Backend ) :
npm run start
