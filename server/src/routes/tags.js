const express = require('express');
const router = express.Router();
const {requireAuth} = require('express-openid-connect');
const {createTag, createSongTag} = require('../services/tagService');


router.post('/create_tag', (req, res) => {

    try {
        const {songId, tag} = req.body;

        if (!songId || !tag)
            return res.status(400).json({error: "missing song id or tag"})
    }
})