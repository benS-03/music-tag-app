const express = require('express');
const router = express.Router();
const {requireAuth} = require('express-openid-connect');
const {createTag, createSongTag} = require('../services/tagService');
const {checkJwt} = reqire('../middleware/auth.js');
const {getSongDataById} = require('../services/spotifyService');
const {createSong} = require('../services/songService')

router.post('/create_tag', (req, res) => {

    try {
        const {songId, tag} = req.body;

        if (!songId || !tag)
            return res.status(400).json({error: "missing song id or tag"});

        try {

            const auth0Id = req.auth.payload.sub;
            
            createSong(getSongDataById(songId));

            const tagRes = await createTag(tag);

            createSongTag(A)


        }
    }
})