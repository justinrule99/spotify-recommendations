const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fetch = require('node-fetch');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

const spotify = new SpotifyWebApi({
    clientId: '5e6daaf9d8084828ada0e00f18aa3778',
    clientSecret: 'daf60cb9e55541adb8e1a9393e6b6da3'
});

app.get('/api/token', async (req, res) => {
    const response = await spotify.clientCredentialsGrant();

    try {
        console.log('The access token expires in ' + response.body['expires_in']);
        console.log('The access token is ' + response.body['access_token']);

        spotify.setAccessToken(response.body['access_token']);
        console.log("at: "+spotify.getAccessToken());

        res.json(spotify.getAccessToken());
    } catch (error) {
        console.log("Something went wrong with getting an access token", error);
    }
});

app.get('/api/toptracks/:artist', async (req, res) => {
    let topTracks;
    try {
        topTracks = await spotify.getArtistTopTracks(req.params.artist, 'US');
        return res.json(topTracks);
    } catch (error) {
        console.log("Error getting top tracks");
    }

});

// url to redirect to for login
app.get('/api/login', async (req, res) => {

    const scopes = ['user-read-private', 'user-read-recently-played', 'user-read-email'];
    const state = 'state';

    const lSpotify = new SpotifyWebApi({
        clientId: '5e6daaf9d8084828ada0e00f18aa3778',
        redirectUri: 'http://localhost:3000'

    });

    const authUrl = lSpotify.createAuthorizeURL(scopes, state, true);
    console.log(authUrl);
    return res.json(authUrl);
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));