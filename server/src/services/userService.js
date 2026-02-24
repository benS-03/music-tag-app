const pool = require('../db/db.js');
const { get } = require('../routes/song.js');

async function getUserIdWithAuth0(auth0Id)
{
    const query = `
    SELECT id
    FROM users
    WHERE auth0_id = $1`;

    try{
        const result = await pool.query(query, [auth0Id]);

        return result.rows[0].id;
    } catch (err)
    {
        throw err;
    }

}

async function createUser(auth0Id){
    
    const query = `
    INSERT INTO users (auth0_id)
    VALUES ($1)
    ON CONFLICT (auth0_id)
    DO UPDATE SET auth0_id = EXCLUDED.auth0_id
    RETURNING *;
    `

    try {
        const res = await pool.query(query,[auth0Id]);

        return res.rows[0];
    }catch (err) {
        throw err;
    }
}

module.exports = {getUserIdWithAuth0, createUser};