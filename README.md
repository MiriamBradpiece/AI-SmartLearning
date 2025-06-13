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
### Backend appsettings.json

## Getting Started

See the full [README](./README.md) for setup instructions, technology details, and project structure.

---

*This project was developed as a mini-MVP assignment to showcase scalable architecture, clean code, and modern full-stack best practices.*
