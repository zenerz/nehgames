const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { networkInterfaces } = require('os');

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/src', express.static('src'));
app.use(express.static('node_modules/bootstrap/dist/css/'))

server.listen(PORT, () => {
    console.log(`\nListening on ... \n`);
    Object.values(networkInterfaces()).forEach( i => {
        i.forEach( n => {
            if (n.family !== 'IPv4') return;
            console.log(`\t>\t\x1b[34mhttp://${n.address}:${PORT}`);
        });
    });
    console.log('');
})

app.get('/', (req, res) => res.render('index') );

app.get('/fnaf2', (req, res) => res.render('game', {game: 'fnaf2'}))

app.get('*', (req, res) => {
    res.send('<h1> Page does not exist </h1>');
})