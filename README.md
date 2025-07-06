# Store Ratings App

## Tech Stack
- **Frontend**: React + Redux + Ant Design
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Prisma
- **Auth**: JWT

```bash
Backend Setup:
1. Install dependencies:
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

```

https://github.com/user-attachments/assets/221315a4-913e-4b37-b34c-7b2f126d1f94

![Screenshot 2025-07-06 114333](https://github.com/user-attachments/assets/bb76c616-0c26-44e9-ac2a-c57d13c77958)

![Screenshot 2025-07-06 114249](https://github.com/user-attachments/assets/0d72dee2-a57d-447d-b942-71043a56bf9a)

![Screenshot 2025-07-06 114445](https://github.com/user-attachments/assets/2b82a268-9a2b-4c55-83da-eae002c13d20)

![Screenshot 2025-07-06 114632](https://github.com/user-attachments/assets/6fbb2e70-c1fd-4e80-b883-3d6eac598dbb)

![Screenshot 2025-07-06 114728](https://github.com/user-attachments/assets/f095bf83-0fed-4652-98fd-c7ea6ab5d138)
