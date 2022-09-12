const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');
const artists = require('./app/Artists');
const albums = require('./app/Albums');
const tracks = require('./app/Tracks');
const config = require('./config');
const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(cors());


const port = 8000;

app.use('/artists', artists);
app.use('/albums', albums);
app.use('/tracks', tracks);

const run = async  () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);
    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
        console.log('Mongo disconnect...');
    });
};
run().catch(e => console.error(e));