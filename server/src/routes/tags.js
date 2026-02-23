const express = require('express');
const router = express.Router();
const {requireAuth} = require('express-openid-connect');
const {createTag, createSongTag} = require('../services/tagService');
const {checkJwt} = require('../middleware/auth.js');
const {getSongDataById} = require('../services/spotifyService');
const {createSong} = require('../services/songService')
const {getUserIdWithAuth0} = require('../services/userService.js');

router.post('/create_tag', checkJwt, async (req, res) => {

    try {
        const {songId, tag} = req.body;
        //Check body includes necessary values
        if (!songId || !tag)
            return res.status(400).json({error: "missing song id or tag"});

        
        // get user.id using Auth0 token from JWT
        const userId = await getUserIdWithAuth0(req.auth.payload.sub);
         if (!userId) {
            return res.status(401).json({ error: "User not found" });
        }
        //get song data from spotify
        const songData = await getSongDataById(songId);

        //get song Data or create song data ( handled by service func)
        const song = await createSong(songData);

        //create tag
        const tagRes = await createTag(tag);

        //create tag relation
        const songTagRes = await createSongTag({tagId: tagRes.id, songId: song.id, userId: userId});


        return res.status(201).json({tag: tagRes, realtion: songTagRes});
            
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Failed to create tag'});
        }
    });