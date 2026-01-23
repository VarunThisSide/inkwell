# 🖋️ Inkwell: Modular Serverless Blogging Platform

Inkwell is a high-performance blogging platform built with a modular architecture. It utilizes a React-based frontend and a serverless backend designed to run on the edge, featuring shared type safety and optimized database connection pooling.



## 🏗️ Architecture Overview

Inkwell is built on a "monorepo-style" modular design:
* **Frontend:** A responsive, high-speed interface built with **React** and **Tailwind CSS**. It features skeleton loading states and professional UI components.
* **Backend:** A serverless API powered by **Hono** and deployed on **Cloudflare Workers** for ultra-low latency.
* **Common (Shared Package):** A dedicated `@varunthisside/inkwell-common` npm package that houses shared TypeScript types, ensuring end-to-end type safety between the frontend and backend.
* **Data Layer:** Managed by **Prisma** with **Prisma Accelerate** to handle connection pooling in a serverless environment efficiently.

### 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS, Zustand
* **Backend:** Hono, Cloudflare Workers
* **ORM/DB:** Prisma, PostgreSQL (Neon/Supabase)
* **Type Safety:** TypeScript (Shared via custom npm package)
* **Authentication:** JWT (JSON Web Tokens)

---

## 🚀 Local Setup & Development

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-setup/) (for Cloudflare Workers development)

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/inkwell.git](https://github.com/YOUR_USERNAME/inkwell.git)
cd inkwell
```
### 2. Configure Environment Variables

Create a .dev.vars file in the backend directory:

```.dev.vars
DATABASE_URL="postgresql://user:password@localhost:5432/inkwell"
JWT_SECRET="your_secret_key"
```

### 3. Run Locally

#### Start the Backend:

```bash
cd backend
npm install
npm run dev
```

#### Start the Frontend:

```bash
cd frontend
npm install
npm run dev
```

---

### 📡 API Endpoints

#### User Routes
- `POST /api/v1/user/signup`: Create a new account.
- `POST /api/v1/user/signin`: Authenticate and receive a JWT.

#### Blog Routes

- `POST /api/v1/blog`: Create a new blog post (Auth required).

- `PUT /api/v1/blog`: Update an existing post.

- `GET /api/v1/blog/:id`: Fetch a specific post by ID.

- `GET /api/v1/blog/bulk`: Retrieve all blog posts.

---

### 📦 Updating Shared Types
This project uses a custom package to prevent runtime errors by maintaining a single source of truth for data structures. To update the shared logic:

1. **Modify Types**: Make changes to your Zod schemas or TypeScript interfaces in the `common/` directory.
2. **Publish/Link**: 
   * **Local:** Use `npm link` to reflect changes immediately.
   * **Production:** Run `npm publish` to update the `@varunthisside/inkwell-common` package on the npm registry.
3. **Sync Dependencies**: Run `npm update @varunthisside/inkwell-common` in both the `frontend/` and `backend/` directories to ensure the entire stack is in sync.

---

### Some more information

* using hono package for using express syntax in cloudflare backend server.
* using prisma for syntax ease and database query language independency.
* using prisma postgres database here.
* used prisma accelerate for connection pooling, so that our database is not down in development because of hundreds of links to the database. database will refuse connection after a limit. prisma isn't directly compatible with cloudflare due to having node js dependency packages like engine, whereas cloudflare has its own runtime.
* jwt for authentication
* `IMPROVEMENT` : pagination is left to be added in route /post/bulk
* published commonly used TS types in npm so that I can use it to both frontend and backend
* used axios to fecth api from backend
* used toastify for notifications
* used react-spinners for loading pause UI
* used lucide-react for icons
* `IMPROVEMENT` : use recoil/redux/zustand basically, a state management for storing allposts
* added react-loading-skeleton for skeleton loading for better UI