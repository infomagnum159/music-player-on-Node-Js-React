const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/',(req, res) => {

  if (req.query.artist) {
    Track.find().populate('album').then(tracks => {
      const result = [];
      tracks.map(item => {
        if (item.album.artist == req.query.artist) {
          result.push(item);
        }
      });
      if (tracks) res.send(result);
      else res.sendStatus(404);
    }).catch(() => res.sendStatus(500));
  } else if (req.query.album) {
    Track.find().populate('album').then(tracks => {
      const result = [];
      tracks.map(item => {
        if (item.album._id == req.query.album) {
          result.push(item);
        }
      });

      if (tracks) res.send(result);
      else res.sendStatus(404);
    }).catch(() => res.sendStatus(500));
  } else {
    Track.find().populate('album')
      .then(tracks => res.send(tracks))
      .catch(() => res.sendStatus(500));
  }
});

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.album) {
        return res.status(400).send('Data Not valid');
    }

    const trackData = {
        name: req.body.name,
        album: req.body.album,
        lasting: req.body.lasting || null
    }


    const track = new Track(trackData);
    try {
        await track.save();
        res.send(track);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const track = await Track.findByIdAndDelete(req.params.id);

        if (track) {
            res.send(`Product ${track.name} removed`);
        } else {
            res.status(404).send({error: 'Product no found'});
        }
    } catch (e) {

    }
})

module.exports = router;