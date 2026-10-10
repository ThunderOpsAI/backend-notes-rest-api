# Software Requirements Specification
## Backend Notes REST API

---

## 1. Purpose

The purpose of this application is to provide a simple RESTful API for managing text notes, demonstrating backend fundamentals including routing, persistence, validation, and error handling. The project is intended as a backend portfolio artifact.

---

## 2. Scope

The API supports CRUD operations for notes stored in a local SQLite database. Authentication and frontend integration are explicitly excluded from scope.

---

## 3. Users

* **Primary User**: Frontend applications consuming the API
* **Secondary User**: Hiring managers reviewing backend architecture and API design

---

## 4. Functional Requirements

### 4.1 Health Check

* FR-1: The API **shall** expose a `GET /health` endpoint returning service status.

### 4.2 Notes Management

* FR-2: The API **shall** return a list of notes via `GET /notes`.
* FR-3: The API **shall** support optional text search via `?q=` query parameter.
* FR-4: The API **shall** return a single note via `GET /notes/:id`.
* FR-5: The API **shall** create a new note via `POST /notes`.
* FR-6: The API **shall** update an existing note via `PUT /notes/:id`.
* FR-7: The API **shall** delete a note via `DELETE /notes/:id`.

### 4.3 Validation and Errors

* FR-8: The API **shall** reject requests missing required fields with a 400 status.
* FR-9: The API **shall** return 404 for non-existent resources.
* FR-10: The API **shall** return structured JSON error responses.

---

## 5. Non-Functional Requirements

* NFR-1: The API **shall** use standard HTTP status codes.
* NFR-2: The API **shall** log incoming requests.
* NFR-3: The API **shall** enable CORS for all origins.
* NFR-4: The API **shall** use SQLite as a file-based database.
* NFR-5: The API **shall** start successfully with a single command.
* NFR-6 (Optional): The API **may** include basic rate limiting.

---

## 6. Data Requirements

### 6.1 Note Data Model

Each note **shall** include:

* `id` (integer, primary key)
* `title` (string, required)
* `body` (string, optional)
* `createdAt` (ISO timestamp)
* `updatedAt` (ISO timestamp)

---

## 7. External Interfaces

* HTTP/JSON REST interface
* SQLite database file
* Express middleware (CORS, logging, validation)

---

## 8. Constraints and Assumptions

* Single-process Node.js runtime
* No authentication or authorization
* Local file-based database only

---

## 9. Acceptance Criteria

* All endpoints respond with correct status codes
* CRUD operations work as expected
* Invalid input produces clear error responses
* Database persists data across server restarts
* API can be tested using curl or Postman

---

## 10. Out of Scope / Future Enhancements

* Authentication/authorization
* User ownership of notes
* Pagination
* Full-text search
* Production-grade rate limiting

---

## 11. Repo Plan

**Repository Name:** `backend-notes-api`

### Recommended Folder Structure

```
src/
 ├─ routes/
 ├─ controllers/
 ├─ services/
 ├─ db/
 ├─ middleware/
 ├─ app.js
 └─ server.js
README.md
```

### README Outline (Headings Only)

* Project Overview
* Tech Stack
* API Endpoints
* Example curl Requests
* Setup Instructions
* Database Schema
* Error Handling
* Future Improvements

---

## 12. MVP Build Plan

1. Initialize Node.js project
2. Set up Express server and middleware
3. Configure SQLite database and schema
4. Implement health endpoint
5. Implement notes CRUD endpoints
6. Add validation and error handling
7. Add logging and CORS
8. Manual API testing
9. Final README

---

## 13. Definition of Done

* [ ] All endpoints implemented and documented
* [ ] Validation and error handling in place
* [ ] SQLite database persists data
* [ ] API passes manual curl/Postman tests
* [ ] README completed
* [ ] Repo pushed with clean structure
