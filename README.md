# DevPulse

## Internal Tech Issue & Feature Tracker. A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

Live Url- [https://dev-puls-phi.vercel.app](https://dev-puls-phi.vercel.app)

---

## Features
- User authentication with secure login system (JWT-based)
- Role-based access control (Maintainer & Contributor)
- Create, update, and delete issues with proper validation
- Single and multiple issue retrieval support
- Centralized error handling with custom AppError system
- Input validation for required fields and constraints
- Middleware-based architecture (auth, logger, validation)
- PostgreSQL database integration using connection pooling
- Clean modular structure (routes, controllers, services, middleware)

## Tech Stack
| Category | Technologies |
|----------|-------------|
|  Backend | Node.js, Express.js |
|  Database | PostgreSQL (pg) |
|  Authentication & Security | JSON Web Token (JWT), bcryptjs, CORS |
|  Language | TypeScript |
|  Environment Management | dotenv |

---

## Setup Instructions

### 1️. Clone the repository
```bash
git clone https://github.com/mahadi40011/DevPulse-Backend.git
cd DevPulse-Backend
```
### 2️. Create environment variables
Create a `.env` file in the root directory.

### 3️. Install dependencies
```bash
npm install
```
### 4️. Run development server
```bash
npm run dev
```

---

## API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login user and get token |

### Issue Routes (`/api/issues`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create a new issue | Maintainer, Contributor (Auth required) |
| GET | `/` | Get all issues (supports query filters) | Public |
| GET | `/:id` | Get single issue by ID | Public |
| PATCH | `/:id` | Update issue | Maintainer or issue owner (Contributor) |
| DELETE | `/:id` | Delete issue | Maintainer only |


### Query Parameters (GET `/api/issues`)

| Query   | Description              | Allowed Values              |
|---------|--------------------------|-----------------------------|
| `sort`  | Sort issues by date/order | `newest`, `oldest`         |
| `type`  | Filter issues by type     | `bug`, `feature_request`   |
| `status`| Filter issues by status   | `open`, `in_progress`, `resolved` |

---

##  Database Schema Summary

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique user ID |
| name | VARCHAR(40) | NOT NULL | User full name |
| email | VARCHAR(50) | UNIQUE, NOT NULL | User email address |
| password | TEXT | NOT NULL | Hashed password |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'contributor' | User role (maintainer / contributor) |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Account creation time |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update time |

---

### Issues Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique issue ID |
| title | VARCHAR(150) | NOT NULL | Issue title |
| description | TEXT | NOT NULL | Detailed issue description |
| type | VARCHAR(20) | NOT NULL | Issue type (bug / feature_request) |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'open' | Issue status (open / in_progress / resolved) |
| reporter_id | INTEGER | NOT NULL | ID of user who reported issue |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Issue creation time |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update time |