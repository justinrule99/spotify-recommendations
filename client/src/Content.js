import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './Content.css';
import AlbumCard from "./AlbumCard";
import styled from 'styled-components';


const BigText = styled.p`
    font-size: 96px;
    font-weight: bold;
    color: white;
`;

const BigButton = styled.button`
    background-color: white;
    width: 300px;
    height: 100px;
    font-size: 48px;
    border: 2px solid black;
    border-radius: 50px;
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

class Content extends Component {

    state = {
        testAlbums: [],
        posts: [],
        signedIn: false
    };

    // should we fetch in App.js?
    // where to authenticate with spotify?
    // should do all server side in node layer (separate project)
    async componentDidMount() {
        console.log('here for fhtis');

        // UPDATED: DO NOT CHANGE
        const clientId = '5e6daaf9d8084828ada0e00f18aa3778';
        const clientSecret = 'daf60cb9e55541adb8e1a9393e6b6da3';
        //
        const spotify = new SpotifyWebApi({
            clientId,
            clientSecret
        });

        const authString = new Buffer(
            clientId + ':' + clientSecret
        ).toString('base64');


        // this literally works in postman what the fuck
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            // params: {
            //     grant_type: 'client_credentials'
            // },
            body: 'grant_type=client_credentials',
            mode: 'no-cors',
            headers: {
                Authorization: "Basic BQCrKHD3xJCUHGok7Z56Woo-Eho5DcmwwyPr2RsBMLeVcny1IP1wjhp2lZ85WNfvnQeqq0SRA4gY0_EIT3k=",
                "Content-Type": "application/x-www-form-url-encoded",
                "Accept": "application/json"
            }
        });

        // console.log(JSON.stringify(res, null, 2));

        spotify.setAccessToken('BQDIf05ryAnj-pd8vtuahsM86JmMKEh6_r0P7kU7sgJly6XQNmeLyv-XdERAN6nRMRZWm2w_iZF2GQXMqL0');

        const crxAlbums = await spotify.getArtistAlbums('5INjqkS1o8h1imAzPqGZBb');

        const topTracks = await spotify.getArtistTopTracks('5INjqkS1o8h1imAzPqGZBb', 'US');

        // console.log(JSON.stringify(topTracks, null, 2));


        // console.log(JSON.stringify(crxAlbums, null, 2));
        topTracks.tracks.map(async (track) => {
            const features = await spotify.getAudioFeaturesForTrack(track.id);
            console.log(track.name);
            console.log(JSON.stringify(features, null, 2));
        });

        const features = await spotify.getAudioFeaturesForTrack(topTracks.tracks[0].id);
        console.log(JSON.stringify(features, null, 2));

        // add images to props
        // console.log(JSON.stringify(crxAlbums.items[0].images[0], null, 2));

        const albums = [];

        crxAlbums.items.map((album) => {
            // console.log(JSON.stringify(album.images[0].url, null, 2))
            if (album.total_tracks >= 1) {
                albums.push(album);
            }
        });

        this.setState({
            testAlbums: albums
        });

        // console.log(this.state);




        // console.log('we made ti ');
        // console.log(JSON.stringify(res));

        // const js = await res.json();
        // console.log(JSON.stringify(js));

        // const spotify = new SpotifyAPI(clientId, clientSecret);
        // const response = await spotify.getToken();
        // console.log(JSON.stringify(response, null, 2));

        // spotify.clientCredentialsGrant().then(
        //     function(data) {
        //         console.log('The access token expires in ' + data.body['expires_in']);
        //         console.log('The access token is ' + data.body['access_token']);
        //
        //         // Save the access token so that it's used in future calls
        //         spotify.setAccessToken(data.body['access_token']);
        //         console.log("at: "+spotify.getAccessToken());
        //
        //
        //     },
        //     function(err) {
        //         console.log('Something went wrong when retrieving an access token', err);
        //     }
        // );


        //
        // // POST url to get accessToken
        // const response = await fetch('https://accounts.spotify.com/api/token', {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     headers: {
        //         'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
        //     },
        //     form: {
        //         grant_type: 'client_credentials'
        //     },
        //     json: true
        // });





        fetch('http://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then((data) => {
                this.setState({ posts: data })
            })
            .catch(console.log)
    }

    render () {

        return (
            <>
                <BigText>{"Improve Your Listening Experience"}</BigText>
                {this.state.signedIn ? <BigButton>{"Sign In"}</BigButton> : null}

                <CardContainer>
                    {this.state.testAlbums.map((album) => (
                        <AlbumCard album={album} key={album.id} />
                    ))}
                </CardContainer>


            </>
        );
    }
}

export default Content;