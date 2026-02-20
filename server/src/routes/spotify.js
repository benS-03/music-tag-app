const express = require('express');
const router = express.Router();
 
const {getAccessToken} = require('../services/spotifyService.js');


router.get('/get-token', async (req, res) => {
    try {
        const token = await getAccessToken();
        res.json({accessToken: token});
    } catch (err){
        console.error(err);
        res.status(500).json({error : 'failed to get spotify token'});
    }

})

router.get('/search', async (req, res) => {

    try {

        // Assign query params, defaults for limit and offset
        const {q, limit = 10, offset = 0} = req.query;

        if (!q) {
            return res.status(400).json({error: "Missing query parameter"})
        }

        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);

        const accessToken = await getAccessToken();

        //Building the url from query params
        const url = new URL('https://api.spotify.com/v1/search');
        url.searchParams.append('q',q);
        url.searchParams.append('type', 'track');
        url.searchParams.append('limit', parsedLimit);
        url.searchParams.append('offset', parsedOffset);

        //Sending request to spotify api and awaitng response
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({error: errorText});
        }

        const data = await response.json();
        res.json(data);

    }catch (err) {
        console.error(err);
        res.status(500).json({error: 'Spotify search failed'});
    }

});

module.exports = router;