# WorkNest - Smart Job Application Hub

WorkNest simplifies job searching with intelligent recommendations and secure authentication.

## Features Implemented

- **JWT Authentication:** Secure email/password login and signup.
- **Failed Login Tracking & OTP Unlock:** Account locking after 5 failed attempts, unlock via email OTP.
- **Job Recommendations:** Personalized suggestions based on user history, similar users, and recent trends (via API).
- **Dashboard:** View saved jobs and track application statuses.
- **Efficient Search:** Search-as-you-type for job listings with debouncing.
- **Performance:** Optimized UI and backend queries (MongoDB aggregation/indexing) for large datasets.

## Planned Features

- Google OAuth Login/Signup
- Real-time Job Posting Updates (WebSockets)

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Docker)
- **Auth:** JWT
- **Other:** Mongoose, Docker, Docker Compose

## Prerequisites

- Node.js (LTS) & npm/yarn
- Docker & Docker Compose
- Git
- Resend Email Service API Key (for OTP)

## Running Locally

1.  **Clone:**

    ```bash
    git clone https://github.com/kamran-027/worknest
    cd worknest
    ```

2.  **Configure `.env`:**

    - Fill in `MONGO_URI`, `JWT_SECRET`, `EMAIL_*` keys, `PORT`(backend `.env`) and `VITE_BACKEND_URL` (frontend `.env`).

3.  **Start MongoDB:**

    - Navigate to the directory with `docker-compose.yml`.
    - ```bash
      docker-compose up -d
      ```

4.  **Run Backend:**

    - `cd backend`
    - `npm install` (or `yarn install`)
    - `npm run dev` (or `yarn dev`)

5.  **Run Frontend:**

    - `cd ../frontend`
    - `npm install` (or `yarn install`)
    - `npm run dev` (or `yarn dev`)

6.  **Access:** Open your browser to the frontend URL (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Start development server (frontend/backend).
- `npm start`: Start production server (backend).
- `npm run build`: Build for production (frontend/backend).
