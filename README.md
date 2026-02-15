# devflow
API Testing
# DevFlow

# Overview

DevFlow is a modular REST API platform built with Node.js and Express, designed to support authenticated task management, workflow automation, 
developer utilities, and API request testing.

The system emphasizes secure authentication, structured API contracts, query-based filtering, dynamic request execution, and scheduled background automation.
The goal of this project was to explore API design principles, request validation, and structured response handling from a developer experience perspective.

# Architecture

Node.js + Express (REST API layer)

MongoDB + Mongoose (data persistence)

JWT Authentication (stateless auth)

bcrypt (password hashing)

Axios (external API execution)

node-cron (scheduled background jobs)

Nodemailer (email notifications)

dotenv (environment configuration)

# Authentication & Authorization

Secure password hashing with bcrypt

JWT-based authentication

Token expiration handling

Middleware-protected routes

User-scoped resource access

Proper HTTP status codes (400, 401, 404, 409, 500)

Sensitive credentials are never exposed in responses.

# Core Modules
1. Task Management API

Create tasks

Fetch tasks with optional filters (priority, status)

Update tasks with ownership validation

Delete tasks

Sorted results by creation time

Example:

GET /task?priority=high&status=pending

2. API Request Management & Replay System

DevFlow includes an authenticated API request testing module where users can:

Save custom API request configurations (method, URL, headers, body)

Filter saved requests by HTTP method

Replay stored requests dynamically

Override headers at runtime

Inspect full response metadata (status, headers, response body)

This module simulates real-world API integration and debugging scenarios.

3. Boilerplate Code Generator

Dynamic endpoint that generates template-based code:

React components

Express routes

Node controllers

Returns structured code output based on request parameters.

4. Scheduled Automation & Reminder System

DevFlow includes background job automation using node-cron:

Minute-level cron job checks for due reminders

Sends email notifications using Nodemailer

Automatically cleans up processed reminders

Groups tasks by user and sends daily due-date summary emails

This module demonstrates:

Time-based database querying

Conditional filtering with MongoDB operators

Batch processing logic

User-level aggregation

Automated email workflows

# Standardized HTTP status codes:

200 – Success

201 – Created

400 – Invalid input

401 – Unauthorized

404 – Resource not found

409 – Conflict

500 – Server error

All responses return structured JSON for predictable client-side handling.

# Design Considerations

Modular route architecture for scalability

Middleware-based authentication

Query parameter filtering for flexible endpoints

Secure password and token handling

Structured error responses for easier debugging

Background job processing for workflow automation

Separation of concerns between routes, controllers, and utilities

# Key Learnings

Designing secure, user-scoped APIs improves data integrity

Clear status codes simplify debugging

Middleware centralizes authentication logic

Query-based filtering enhances flexibility

Background job scheduling enables workflow automation

Structured API contracts improve developer experience

Automates API-driven workflows


