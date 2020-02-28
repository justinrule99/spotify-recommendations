import React from 'react';
import '../styles/App.css';
import NavBar from "./NavBar";
import Content from "./Content";
import Footer from "./Footer";
import styled from 'styled-components';
import {
    getAuthUrl,
    getMe,
    getPlaylistTracks,
    getTopTracks,
    getUserPlaylists,
    sendTokenAndAuthenticate
} from "../util/spotify-utils";
import background from '../images/back-3.jpg';


// change img if logged in
const MainApp = styled.div`
    // background: rgb(2,0,36);
    // background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(43,130,76,1) 35%, rgba(0,212,255,1) 100%);
    background-image: url(${background});
    // background-repeat: no-repeat;
    background-size: 100% 1000px;
    width: 100%;
`;

const BigButton = styled.button`
    background-color: Transparent;
    background-repeat:no-repeat;
    width: 200px;
    height: 50px;
    font-size: 16px;
    border: 2px solid black;
    border-radius: 50px;
    outline: none;
`;

const BigText = styled.p`
    font-size: 96px;
    font-weight: bold;
    color: white;
`;

const ButtonLink = styled.a`
    text-decoration: none;
    font-weight: bold;
    color: white;
`;

class App extends React.Component {
    state = {
        loggedIn: false,
        url: '',
        name: '',
        playlists: []
    };

    async componentDidMount() {

        if (this.state.url === '') {
            const url = await getAuthUrl();
            console.log(url);
            this.setState({url});
        }

        let curUrl = window.location.href;
        const first = curUrl.indexOf('=') + 1;
        const last = curUrl.indexOf('&');
        const code = curUrl.substring(first, last);
        console.log("oce: ");
        console.log(code);

        if (!this.state.loggedIn) {
            // do post request for token
            console.log('doing auth');

            try {
                const token = await sendTokenAndAuthenticate(code);
                this.setState({loggedIn: true});
                console.log('L;KDJSASD;KJF');
                // console.log('token from component: ', JSON.stringify(token, null, 2));
            } catch (error) {
                console.log(error);
            }
        }

        if (this.state.loggedIn) {
            const tracks = await getTopTracks('4NfVXEoTZVX7rpJSZEVGLg');
            console.log('TACKS: ');
            console.log(tracks);

            const me = await getMe();
            console.log(JSON.stringify(me, null, 2));
            this.setState({name: me.body['display_name']});

            // get user playlists
            const myPlaylists = await getUserPlaylists(me.body.id);
            console.log('PLAYSLI');
            // console.log(myPlaylists);
            for (let i = 0; i < 20; i++) {
                // console.log(myPlaylists.body.items[i].tracks.href);
            }
            this.setState({playlists: myPlaylists.body.items});

            // gets tracks from the first playlist
            // may want to do this in another component, then lift up state
            const pTracks = await getPlaylistTracks(myPlaylists.body.items[0].id);
            console.log(JSON.stringify(pTracks, null, 2));
            this.setState({pTracks: pTracks});

        }



        // only get stuff if signed in
    }

    render() {
        return (
            <>
                <MainApp className="App">
                    <NavBar url={this.state.url} loggedIn={this.state.loggedIn} name={this.state.name} />
                    <BigText>{"Improve Your Listening Experience"}</BigText>
                    {this.state.loggedIn ?
                        <Content playlists={this.state.playlists}/>
                    :
                        <BigButton><ButtonLink href={this.state.url}>{"Sign In"}</ButtonLink></BigButton>
                    }
                    <Footer>
                        <p>{"Here is some text in the footer"}</p>
                    </Footer>
                </MainApp>
            </>
        );

    }

}

export default App;
