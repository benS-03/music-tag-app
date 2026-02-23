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

module.exports = {getUserIdWithAuth0};