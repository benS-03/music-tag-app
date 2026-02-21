const pool = require('../db/db.js');


async function createTag(title) {

    const query = `
    INSERT INTO tags (title)
    VALUES ($1)
    RETURNING title`;

    try {
        const result = await pool.query(query, [title]);

        return result.rows[0];
    } catch (err) {
        throw (err);
    }
}

async function createSongTag(data) {
    {tagId, songId, userId}
    
    const query = `
    INSERT INTO song_tags (song_id, tag_id, created_by)
    VALUES $1, $2, $3
    RETURNING *`

    try {
        const result = await pool.query(query, [
            tagId,
            songId,
            userId
        ]);
    } catch (err) {
        throw(err);
    }
    
}

module.exports = {createTag, createSongTag};