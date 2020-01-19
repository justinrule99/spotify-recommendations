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

    const authUrl = lSpotify.createAuthorizeURL(scopes, state, true);
    console.log(authUrl);
    return res.json(authUrl);
});

app.post('/api/authenticate', async (req, res) => {
    // expecting a code as req.body
    console.log(req.body);
    // res.send(
    //     `I received your POST request. This is what you sent me: ${req.body.post}`,
    // );

    try {
        const response = await lSpotify.authorizationCodeGrant(req.body);
        lSpotify.setAccessToken(response.body['access_token']);
        lSpotify.setRefreshToken(response.body['refresh_token']);

        return res.json(lSpotify.getAccessToken());
    } catch (error){
        res.send('there was an erry');
    }



});


// code: AQAdPk4AiSec-EJ81Nv6twxbWGwWJzUDkHpjAKAUkUojZvotpbfyS0bFmxb-mciqE-T36DLtxfNq30y9Zlitu7s-oUd9JVK9wxIVwEiaZQg9tSv35Jlg0tjMA1YQjLruBptestZCvIOKdiU5pjORyswc8vHxN7AbfEo6bjTk6CDSeSZ8IAkroy7U0DkGJvrVGs1tW5xAHM3rcUJQAP_6au-zRGjTPiRszoJOF9peVZG0kjYK2Fd8Xwt5XUsbhAt10sEpPOgCsnn_XQ

app.listen(port, () => console.log(`Listening on port ${port}`));