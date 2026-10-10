const db = require('../db/database');

// FR-2: Get all notes (with optional search FR-3)
exports.getAllNotes = (req, res) => {
    const { q } = req.query;
    let sql = 'SELECT * FROM notes';
    const params = [];

    if (q) {
        sql += ' WHERE title LIKE ? OR body LIKE ?';
        params.push(`%${q}%`, `%${q}%`);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
};

// FR-4: Get single note
exports.getNoteById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // FR-9: 404 for non-existent
        if (!row) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }
        res.json({ data: row });
    });
};

// FR-5: Create new note
exports.createNote = (req, res) => {
    const { title, body } = req.body;

    // FR-8: Validate required fields
    if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
    }

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const sql = 'INSERT INTO notes (title, body, createdAt, updatedAt) VALUES (?, ?, ?, ?)';
    const params = [title, body || '', createdAt, updatedAt];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({
            data: {
                id: this.lastID,
                title,
                body: body || '',
                createdAt,
                updatedAt
            }
        });
    });
};

// FR-6: Update existing note
exports.updateNote = (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;

    // Check if note exists first to handle 404 correctly
    db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        // Use existing values if not provided (partial update support, though PUT usually implies full replacement)
        // SRS says PUT, usually requires full payload or strict validation, but let's be flexible or overwrite.
        // Let's assume title is required if we strictly follow PUT semantics replacing the resource, 
        // but for simplicity in this MVP we might allow partials OR enforce title presence. 
        // FR-8 says "reject requests missing required fields", so if this is a PUT, we expect a Title? 
        // Let's enforce Title if the user intends to update it to "empty" which is not allowed. 
        // But simply: update the fields provided or keep old ones?
        // Let's stick to standard replacement logic for PUT or partial for PATCH. 
        // Given it's a simple API, let's just update provided fields and validate title if provided.
        // Actually, FR-8 says "reject requests missing required fields". 
        // Safe bet: If title is missing in body, and we treat it as "replace", that's 400.
        // But users often use PUT for partial updates in simple tutorials. 
        // Let's require Title if it's being updated to something new, or just `COALESCE` in SQL?
        // Let's go with: Update fields provided.

        const newTitle = title !== undefined ? title : row.title;
        const newBody = body !== undefined ? body : row.body;

        if (!newTitle) {
            res.status(400).json({ error: 'Title cannot be empty' });
            return;
        }

        const updatedAt = new Date().toISOString();
        const sql = 'UPDATE notes SET title = ?, body = ?, updatedAt = ? WHERE id = ?';

        db.run(sql, [newTitle, newBody, updatedAt, id], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                data: {
                    id: Number(id),
                    title: newTitle,
                    body: newBody,
                    createdAt: row.createdAt,
                    updatedAt
                }
            });
        });
    });
};

// FR-7: Delete note
exports.deleteNote = (req, res) => {
    const { id } = req.params;

    // Check existence first or check `this.changes` after run?
    // checking `this.changes` is more atomic/cleaner for delete
    db.run('DELETE FROM notes WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }
        res.json({ message: 'Note deleted successfully' });
    });
};
