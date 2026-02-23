const pool = require('../db/db.js');


async function createSong(data){

    
    const {spotifyId, name, artist, album, image, duration} = data;

    const query = `
    INSERT INTO songs (spotify_id, title, artist, album, spotify_image, duration)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (spotify_id)
    DO UPDATE SET spotify_id = EXCLUDED.spotify_id
    RETURNING *`;

    try{

        const result = await pool.query(query, [
            spotifyId,
            name,
            artist,
            album,
            image,
            duration
        ]);

        return result.rows[0];
    } catch (err) {
        
        throw err;
    }

    
};


async function getSongs({limit = 10, offset = 0, orderBy = 'title'} = {}) {

    const allowedColumns = ['title', 'artist', 'album', 'created_at']

    if(!allowedColumns.includes(orderBy))
        orderBy = 'title';

    const query =  `
    SELECT * FROM songs
    ORDER BY ${orderBy}
    LIMIT $1 OFFSET $2`

    try {
        const result = await pool.query(query, [
            limit,
            offset
        ]);

        return result.rows;
    }catch (err) {
        throw err;
    }
}

async function getSongIdFromSpotfyId(spotifyId){

    const query = `
    SELECT id 
    FROM songs
    WHERE spotify_id = $1`;

    try {
        const result = await pool.query(query, [spotifyId]);
        if (result.rows.length === 0)
            return -1;
        return result.rows[0].id;
    } catch (err) {
        throw(err);
    }
}


async function getFilteredSongs({tags, match = 'any', limit = 10, offset = 0, orderBy = 'title'} = {})
{
    const allowedColumns = ['title', 'artist', 'album', 'created_at']

    if(!allowedColumns.includes(orderBy))
        orderBy = 'title';

    try {
        if (match === 'all'){
            const query = `
            SELECT * 
            FROM songs s
            JOIN song_tags st ON s.id = st.song_id
            JOIN tags t ON t.id = st.tag_id
            WHERE t.title = ANY($1)
            GROUP BY s.id
            HAVING COUNT(DISTINCT t.title) = $2
            ORDER BY ${orderBy}
            LIMIT $3 OFFSET $4
            `;

            const result = await pool.query(query, [tags, tags.length, limit, offset]);

            return result.rows;


        } else {
            const query = `
            SELECT * 
            FROM songs s
            JOIN song_tags st ON s.id = st.song_id
            JOIN tags t ON t.id = st.tag_id
            WHERE t.title = ANY($1)
            ORDER BY ${orderBy}
            LIMIT $2 OFFSET $3
            `;

        const result = await pool.query(query, [tags, limit, offset]);

        return result.rows;
        }
    } catch (err) {
        throw(err);
    }
}


module.exports = {createSong, getSongs, getFilteredSongs,getSongIdFromSpotfyId};