const pool = require('../db/db.js');


async function createTag(title) {

    const query = `
    INSERT INTO tags (title)
    VALUES ($1)
    ON CONFLICT (title) DO UPDATE SET title = EXCLUDED.title
    RETURNING *`;

    try {
        const result = await pool.query(query, [title]);

        return result.rows[0];
    } catch (err) {
        throw (err);
    }
}

async function createSongTag(data) {
    const {tagId, songId, userId} = data;
    
    const query = `
    INSERT INTO song_tags (song_id, tag_id, created_by)
    VALUES ($1, $2, $3)
    RETURNING *`

    try {
        const result = await pool.query(query, [
            songId,
            tagId,
            userId
        ]);

        return result.rows[0];
    } catch (err) {
        throw(err);
    }
    
}

module.exports = {createTag, createSongTag};