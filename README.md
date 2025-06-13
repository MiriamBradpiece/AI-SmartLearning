# AI-Driven Learning Platform

This project is a mini MVP of an AI-powered learning platform, built to demonstrate modern full-stack development, clean architecture, and modular code organization.

## Overview

The platform enables users to register, choose what they want to learn (by category and sub-category), send prompts to an AI (OpenAI GPT), receive auto-generated lessons, and track their learning history. An admin dashboard is included for managing users and viewing all prompt histories.

## Tech Stack

- **Backend:** C# (.NET Core) with Entity Framework (SQL)
- **Frontend:** React
- **Database:** SQL Server (managed with Entity Framework)
- **AI Integration:** OpenAI GPT API

## Key Features

- User registration & management
- Category and sub-category selection
- Prompt submission and AI-generated lesson responses
- User learning history tracking
- Admin dashboard: list users & all prompt histories
- Clean, modular architecture (separated controllers, services, models, etc.)
- Input validation & API error handling
- Docker support for database setup

## Project Highlights

- **Backend:** RESTful API built with C# and .NET Core, using Entity Framework for database modeling and queries. Implements all relationships and constraints per the project specification.
- **Frontend:** Modern, responsive React dashboard for both users and admins.
- **AI Integration:** Prompts are sent to OpenAI's GPT API to generate dynamic, personalized lessons.
- **Documentation:** Project includes clear setup instructions, .env sample, and usage notes.

---

### Backend appsettings.json

```

```json
{
    "OpenAI": {
        "ApiKey": "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",
        "Model": "gpt-3.5-turbo"
    },
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft.AspNetCore": "Warning"
        }
    },
    "AllowedHosts": "*",
    "Configuration": {
        "MyAdmin": "326894813"
    }
}
```

**Environment Variable Example:**

```
VITE_MY_ADMIN=329596076

## Getting Started
```
1. **Clone the repository**

   ```bash
   git clone https://github.com/MiriamBradpiece/AI-SmartLearning.git
   cd AI-SmartLearning
   ```

2. **Install dependencies**  
   - For the backend and frontend, follow the instructions in their respective folders (`/backend` and `/frontend`).  
   - Example (from the root folder):

     ```bash
     cd backend
     # For .NET: restore dependencies
     dotnet restore

     cd ../frontend
     # For npm/yarn: install dependencies
     npm install
     # or
     yarn install
     ```

3. **Setup environment variables**  
   - Copy the provided `.env.example` (or use the example below) to `.env` in the frontend directory and set your admin user ID and any required API keys.

     Example for frontend `.env`:
     ```
     VITE_MY_ADMIN=329596076
     ```

   - For the backend, set your OpenAI API key and admin user in `appsettings.json` (see above).

4. **Database Setup**  
   - Ensure SQL Server is running (Docker is supported).
   - Update connection strings in backend `appsettings.json` if needed.
   - Use Entity Framework migrations to create the database, e.g.:

     ```bash
     cd backend
     dotnet ef database update
     ```

5. **Run the Applications**  
   - **Backend:**  
     ```bash
     cd backend
     dotnet run
     ```
   - **Frontend:**  
     ```bash
     cd frontend
     npm run dev
     # or
     yarn dev
     ```

6. **Open in Browser**  
   - Visit `http://localhost:3000` (or the port shown in terminal) for the frontend UI.

---

## How to Use

1. **Register:** Go to `/signup` and create a new user.
2. **Login:** Go to `/login` and enter your user ID.
   - If you use the admin ID from `.env`, you will see the admin dashboard.
   - Any other ID will show the regular user dashboard.
3. **Category:** Select a category/subcategory, enter a prompt, and get a lesson.
4. **History:** View your previous prompts and AI responses.
5. **Admin Dashboard:** View all prompts.

---

## Plugins & Packages Used

- @reduxjs/toolkit
- react-redux
- react-router-dom
- eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, typescript-eslint
- dotenv
- vite
- **Swashbuckle.AspNetCore** (for Swagger/OpenAPI)

(see package.json for the full list)

---

*This project was developed as a mini-MVP assignment to showcase scalable architecture, clean code, and modern full-stack best practices.*
