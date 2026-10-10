# Backend Notes API

A simple RESTful API for managing text notes, demonstrating backend fundamentals including routing, persistence, validation, and error handling. This project uses Node.js, Express, and SQLite.

## Tech Stack
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** SQLite3
*   **Middleware:** Morgan (Logging), CORS

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Check API status |
| `GET` | `/notes` | Get all notes (supports `?q=searchterm`) |
| `GET` | `/notes/:id` | Get a specific note by ID |
| `POST` | `/notes` | Create a new note |
| `PUT` | `/notes/:id` | Update an existing note |
| `DELETE` | `/notes/:id` | Delete a note |

## Setup Instructions

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Server:**
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3000`.

## Example Requests (curl)

**Create a Note:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"title":"My First Note", "body":"This is a test note."}' http://localhost:3000/notes
```

**Get All Notes:**
```bash
curl http://localhost:3000/notes
```

**Search Notes:**
```bash
curl "http://localhost:3000/notes?q=First"
```

**Update a Note:**
```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Updated Title"}' http://localhost:3000/notes/1
```

**Delete a Note:**
```bash
curl -X DELETE http://localhost:3000/notes/1
```

## Database Schema

The SQLite database (`notes.db`) contains a single table `notes`:

*   `id`: INTEGER PRIMARY KEY AUTOINCREMENT
*   `title`: TEXT NOT NULL
*   `body`: TEXT
*   `createdAt`: TEXT (ISO 8601 Date String)
*   `updatedAt`: TEXT (ISO 8601 Date String)

## Error Handling

*   **400 Bad Request:** Missing required fields (e.g., `title`).
*   **404 Not Found:** Resource does not exist using invalid ID.
*   **500 Internal Server Error:** Server-side issues.

Responses for errors follow the JSON structure:
```json
{
  "error": "Error message description"
}
```

## Future Improvements
*   Authentication/authorization
*   Pagination for large lists of notes
*   Full-text search integration
