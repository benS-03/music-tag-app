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

module.exports = router;