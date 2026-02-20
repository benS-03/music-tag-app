const express = require('express');
const pool = require('./src/db/db.js');
require('dotenv').config();

const {auth} = require('express-openid-connect');
const auth_config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: 'http://localhost:6700',
  clientID: 'qIJ5hIP9EEUX68s0qMc2ifiWG2LRHHuR',
  issuerBaseURL: 'https://dev-2pxlh77unb6kcs2a.us.auth0.com'
};


const spotifyRoutes = require('./src/routes/spotify.js');
const songRoutes = require('./src/routes/song.js');



const app = express();
app.use(express.json());
app.use('/spotify', spotifyRoutes);
app.use('/song', songRoutes);


// Testing Endpoints
app.get('/', (req, res) => {
    res.send('Server is lowkey running'
    );

});



app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Database Connection Failed'});
  }
});

//TAGGING ENDPOINTS


const PORT = process.env.PORT || 3000; // fallback if not set

app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server', err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
