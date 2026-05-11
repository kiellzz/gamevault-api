# 🎮 GameVault API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=ffffff" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=ffffff" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=ffffff" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=ffffff" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=ffffff" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=ffffff" />
</p>

<p align="center">
  <img src="https://github.com/kiellzz/gamevault-api/actions/workflows/tests.yml/badge.svg" />
</p>

---

## 🧠 About the Project

REST API for managing a personal game collection — think Letterboxd, but for games.

Users can register, log in, browse games, add them to their collection with a status, and leave reviews with ratings.

---

## 🚀 Features

* User registration and login with JWT authentication
* Password hashing with bcrypt
* Browse and search games by title, genre or platform
* Add games to personal collection with status: `playing`, `completed`, `dropped` or `wishlist`
* Rate and review games (1–10)
* Input validation with Zod on all endpoints
* Protected routes with auth middleware
* Automated tests with Jest + Supertest
* CI/CD with GitHub Actions

---

## 🛠 Tech Stack

* Node.js
* TypeScript
* Express
* PostgreSQL
* Prisma ORM
* Zod (validation)
* JWT (authentication)
* bcrypt (password hashing)
* Jest + Supertest (tests)

---

## 📦 Project Structure

```bash
gamevault-api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── prisma.ts
│   ├── controllers/
│   │   ├── userController.ts
│   │   └── gameController.ts
│   ├── services/
│   │   ├── userService.ts
│   │   └── gameService.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   └── gameRoutes.ts
│   ├── schemas/
│   │   ├── userSchema.ts
│   │   └── gameSchema.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   └── __tests__/
│       └── app.test.ts
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 📖 Data Models

### User
* `id`, `name`, `email`, `password`, `createdAt`

### Game
* `id`, `title`, `genre`, `platform`, `releaseYear`, `coverUrl`, `createdAt`

### GameCollection
* `userId`, `gameId`, `status` (`playing` | `completed` | `dropped` | `wishlist`)

### Review
* `userId`, `gameId`, `rating` (1–10), `content`

---

## ⚙️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/kiellzz/gamevault-api.git
cd gamevault-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/gamevault"
JWT_SECRET="your_secret_key"
```

### 4. Run migrations

```bash
npx prisma migrate dev
```

### 5. Start the server

```bash
npm run dev
```

Server running at `http://localhost:3000`

---

## ▶️ Scripts

```bash
npm run dev    # Start development server
npm run build  # Compile TypeScript
npm start      # Run production build
npm test       # Run tests
```

---

## 🧪 Tests

9 automated tests covering all endpoints including auth, games, collection and validation.

```bash
npm test
```

Tests run automatically on every push via **GitHub Actions**.

---

## 🩺 Health Check
GET /health → { "status": "ok" }

---

## 📌 Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/users/register` | ❌ | Register a new user |
| POST | `/api/users/login` | ❌ | Login and get JWT token |

### Games
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/games` | ❌ | List all games |
| GET | `/api/games/:id` | ❌ | Get game by ID |
| POST | `/api/games` | ✅ | Create a game |
| POST | `/api/games/:id/collection` | ✅ | Add game to collection |
| POST | `/api/games/:id/review` | ✅ | Rate and review a game |
| GET | `/api/users/collection` | ✅ | Get my collection |

---

## 👨‍💻 Author

Developed by **Ezequiel Borges**

* GitHub: [https://github.com/kiellzz](https://github.com/kiellzz)
* LinkedIn: [https://linkedin.com/in/ezequielborgesdev/](https://linkedin.com/in/ezequielborgesdev/)