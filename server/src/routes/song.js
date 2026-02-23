const express = require('express');
const router = express.Router();
const {createSong, getSongs, getFilteredSongs} = require('../services/songService')
const {getSongDataById} = require('../services/spotifyService');


router.post('/save_song', async (req, res) => {

    const id = req.body.spotifyId;

    console.log(`${id} being saved to db`);

    try {
        const data = await getSongDataById(id);
        const {spotifyId, name, artist, album, image, duration} = data;
        const song = await createSong(data);
        res.status(201).json(song);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to Save Song'});
    }
})

router.get('/get_songs', async (req, res) => {

    const {tags, match, limit, offset, orderBy} = req.query;
    const parsedLimit = Number(limit) || 10;
    const parsedOffset = Number(offset) || 0;
    let songs
    try {

        if (!tags) {
            songs = await getSongs({limit: parsedLimit, offset: parsedOffset, orderBy});
        } else {
            const tagArray = tags? tags.split(','): [];
            songs = await getFilteredSongs({
                tags: tagArray, 
                match, 
                limit: parsedLimit, 
                offset: parsedOffset, 
                orderBy});
        }

        res.status(200).json(songs);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to REtrive Songs'});
    }

});

module.exports = router;