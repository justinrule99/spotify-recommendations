const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const spotify = new SpotifyWebApi({
    clientId: '5e6daaf9d8084828ada0e00f18aa3778',
    clientSecret: 'daf60cb9e55541adb8e1a9393e6b6da3'
});

const lSpotify = new SpotifyWebApi({
    clientId: '5e6daaf9d8084828ada0e00f18aa3778',
    clientSecret: 'daf60cb9e55541adb8e1a9393e6b6da3',
    redirectUri: 'http://localhost:3000'

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
        topTracks = await lSpotify.getArtistTopTracks(req.params.artist, 'US');
        return res.json(topTracks);
    } catch (error) {
        console.log("Error getting top tracks");
    }

});

app.get('/api/getme', async (req, res) => {
    let user;

    try {
        user = await lSpotify.getMe();
        return res.json(user);
    } catch (error) {
        console.log(error);
    }

});

app.get('/api/getplaylists/:userId', async (req, res) => {

    let playlists;
    try {
        playlists = await lSpotify.getUserPlaylists(req.params.userId);
        return res.json(playlists);
    } catch (error) {
        res.send('error');
    }
});

// url to redirect to for login
app.get('/api/login', async (req, res) => {

    const scopes = ['user-read-private', 'user-read-recently-played', 'user-read-email', 'user-top-read'];
    const state = 'state';

    const authUrl = lSpotify.createAuthorizeURL(scopes, state, true);
    console.log(authUrl);
    return res.json(authUrl);
});

app.post('/api/authenticate', async (req, res) => {
    console.log('code:');
    console.log(req.body.code);

    try {
        const response = await lSpotify.authorizationCodeGrant(req.body.code);

        console.log(response);
        lSpotify.setAccessToken(response.body['access_token']);
        lSpotify.setRefreshToken(response.body['refresh_token']);

        return res.json(response.body);
    } catch (error){
        res.send('uh oh there was an erry');
    }
});


app.listen(port, () => console.log(`Listening on port ${port}`));