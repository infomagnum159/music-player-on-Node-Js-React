const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const artists = require('./app/Artists');
const albums = require('./app/Albums');
const tracks = require('./app/Tracks');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const port = 8000;

app.use('/artists', artists);
app.use('/albums', albums);
app.use('/tracks', tracks);

const run = async  () => {
    await mongoose.connect('mongodb://localhost/music');
    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
    exitHook(() => {
        console.log('Mongo exiting...');
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));