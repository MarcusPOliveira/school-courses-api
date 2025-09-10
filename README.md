# School API

A modern REST API for managing courses, built with Node.js, TypeScript, Fastify, and Drizzle ORM.

## 🚀 Technologies

- **Node.js** - JavaScript runtime
- **TypeScript** - Typed superset of JavaScript
- **Fastify** - Fast and efficient web framework
- **Drizzle ORM** - TypeScript-first ORM
- **PostgreSQL** - Relational database
- **Zod** - TypeScript-first schema validation
- **Swagger/OpenAPI** - API documentation

## 📋 Features

- ✅ Course CRUD operations
- ✅ Data validation with Zod
- ✅ Automatic API documentation
- ✅ Database migrations
- ✅ TypeScript with strict typing
- ✅ Structured logging with Pino

## 📊 Application Architecture Flow

```mermaid
graph TB
    %% Client Layer
    subgraph "Client Layer"
        CLI[Client Application]
        CURL[cURL/Postman]
        BROWSER[Browser]
    end
    
    %% API Layer
    subgraph "API Layer - Fastify Server :3333"
        FASTIFY[Fastify Instance]
        SWAGGER[Swagger/OpenAPI Docs<br>/docs]
        LOGGER[Pino Logger]
        MIDDLEWARE[Type Provider<br>fastify-zod]
    end
    
    %% Route Layer
    subgraph "Route Layer"
        CREATE[POST /courses<br>Create Course]
        GET_ALL[GET /courses<br>List Courses]
        GET_BY_ID[GET /courses/:id<br>Get Course by ID]
    end
    
    %% Validation Layer
    subgraph "Validation Layer"
        ZOD_CREATE[Zod Schema<br>title: string.min(3)]
        ZOD_PARAMS[Zod Schema<br>id: uuid()]
        ZOD_RESPONSE[Response Validation<br>201/200/404]
    end
    
    %% Data Layer
    subgraph "Data Access Layer"
        DRIZZLE[Drizzle ORM<br>Query Builder]
        SCHEMA[Database Schema<br>courses table]
    end
    
    %% Database Layer
    subgraph "Database Layer"
        POSTGRES[(PostgreSQL<br>school_db)]
        MIGRATIONS[Migration Files<br>./drizzle/*.sql]
    end
    
    %% Flow connections
    CLI --> FASTIFY
    CURL --> FASTIFY
    BROWSER --> FASTIFY
    
    FASTIFY --> MIDDLEWARE
    MIDDLEWARE --> CREATE
    MIDDLEWARE --> GET_ALL
    MIDDLEWARE --> GET_BY_ID
    
    CREATE --> ZOD_CREATE
    GET_BY_ID --> ZOD_PARAMS
    GET_ALL --> ZOD_RESPONSE
    
    ZOD_CREATE --> DRIZZLE
    ZOD_PARAMS --> DRIZZLE
    ZOD_RESPONSE --> DRIZZLE
    
    DRIZZLE --> SCHEMA
    SCHEMA --> POSTGRES
    
    MIGRATIONS --> POSTGRES
    
    %% Documentation and Logging
    SWAGGER -.->|"API Documentation"| FASTIFY
    LOGGER -.->|"Request/Response Logs"| FASTIFY
    
    %% Error handling
    ZOD_CREATE -.->|"Validation Error"| FASTIFY
    ZOD_PARAMS -.->|"Invalid UUID"| FASTIFY
    DRIZZLE -.->|"Database Error"| FASTIFY
    
    %% Styling
    classDef clientClass fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    classDef apiClass fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef routeClass fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef validationClass fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    classDef dataClass fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef dbClass fill:#f1f8e9,stroke:#558b2f,stroke-width:2px
    
    class CLI,CURL,BROWSER clientClass
    class FASTIFY,SWAGGER,LOGGER,MIDDLEWARE apiClass
    class CREATE,GET_ALL,GET_BY_ID routeClass
    class ZOD_CREATE,ZOD_PARAMS,ZOD_RESPONSE validationClass
    class DRIZZLE,SCHEMA dataClass
    class POSTGRES,MIGRATIONS dbClass
```

## 🛠️ Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- PostgreSQL (or Docker)

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd school-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your configurations:
```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/school_db
```

### Database Setup

#### Option 1: Docker (Recommended)

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Run migrations
npm run db:migrate
```

#### Option 2: Local PostgreSQL

1. Create the `school_db` database
2. Configure the `DATABASE_URL` in the `.env` file
3. Run migrations:
```bash
npm run db:migrate
```

## 🎯 Usage

### Starting the server

```bash
# Development mode (with hot reload)
npm run dev
```

The server will be available at `http://localhost:3333`

### API Documentation

In development mode, access the documentation at:
- **Swagger UI**: `http://localhost:3333/docs`

### Available commands

```bash
# Development
npm run dev                 # Start server with hot reload

# Database
npm run db:generate         # Generate migrations from schema
npm run db:migrate          # Apply pending migrations
npm run db:studio           # Open Drizzle Studio (database GUI)
```

## 📚 Endpoints

### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/courses` | List all courses |
| `GET` | `/courses/:id` | Get course by ID |
| `POST` | `/courses` | Create new course |

### Usage examples

#### Create course
```bash
curl -X POST http://localhost:3333/courses \
  -H "Content-Type: application/json" \
  -d '{"title": "JavaScript Fundamentals"}'
```

#### List courses
```bash
curl http://localhost:3333/courses
```

#### Get course by ID
```bash
curl http://localhost:3333/courses/{course-id}
```

## 🏗️ Project Structure

```
src/
├── database/
│   ├── client.ts          # Drizzle client configuration
│   └── schema.ts          # Database table schemas
├── routes/
│   ├── create-course.ts   # Create course route
│   ├── get-courses.ts     # List courses route
│   └── get-course-by-id.ts # Get course by ID route
└── server.ts              # Fastify server configuration
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.