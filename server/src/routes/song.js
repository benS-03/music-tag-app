const express = require('express');
const router = express.Router();
const {createSong, getSongs} = require('../services/songService')
const {getSongDataById} = require('../services/spotifyService');

/*
EXPECTED PAYLOAD
{
    spotifyID:
    name:
    artist:
    album:
    image:
    duration:
}
*/
router.post('/save_song', async (req, res) => {

    console.log('Body Received: ', req.body);
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

    const {limit, offset, orderBy} = req.query;
    const parsedLimit = limit? parseInt(limit, 10) : undefined;
    const parsedOffset = offset ? parseInt(offset, 10) : undefined;

    try {
        const songs = await getSongs({parsedLimit, parsedOffset, orderBy});
        res.status(200).json(songs);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to REtrive Songs'});
    }

});

module.exports = router;