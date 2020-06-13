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
    background: rgb(2,0,36);
    background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 32%, rgba(36,118,135,1) 100%);
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
        token: '',
        playlists: []
    };

    async componentDidMount() {

        console.log("OLD COOKIE");
        console.log(document.cookie);
        // if cookie has valid access and refresh token, set loggedIn to true
        // try a get me with cookie info
        // need to ste accessToken and refreshToken to cookie
        // bypass sendTokenAndAuthenticate and manually send tokens
        const me = await getMe();
        if (me.statusCode !== 401) {
            this.setState({loggedIn: true});
        } else {
            console.log("ERORR LOGIN");

        }
        // if statuscode is 401, then continue
        // else, get let logged in and skip
        console.log(JSON.stringify(me, null, 2));



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

        // if we have the code, log in automatically (no cookies for now)



        if (!this.state.loggedIn) {
            // do post request for token
            console.log('doing auth');

            try {
                const token = await sendTokenAndAuthenticate(code);
                console.log(JSON.stringify(token, null, 2));
                document.cookie = "accessToken="+token.access_token+"refreshToken="+token.refresh_token+";";
                this.setState({loggedIn: true, token: token});
                // console.log('token from component: ', JSON.stringify(token, null, 2));
            } catch (error) {
                console.log(error);
            }
        }

        if (this.state.loggedIn) {
            const tracks = await getTopTracks('4NfVXEoTZVX7rpJSZEVGLg');
            console.log('TACKS: ');
            // console.log(tracks);

            const me = await getMe();
            console.log(JSON.stringify(me, null, 2));
            this.setState({name: me.body['display_name']});

            // get user playlists
            const myPlaylists = await getUserPlaylists(me.body.id);
            // console.log(myPlaylists);
            for (let i = 0; i < 20; i++) {
                // console.log(myPlaylists.body.items[i].tracks.href);
            }
            this.setState({playlists: myPlaylists.body.items});

            // gets tracks from the first playlist
            // may want to do this in another component, then lift up state
            const pTracks = await getPlaylistTracks(myPlaylists.body.items[0].id);
            // console.log(JSON.stringify(pTracks, null, 2));
            this.setState({pTracks: pTracks});

        }


    }




    render() {
        const backgroundClass = this.state.loggedIn ? "AppLong" : "App";

        return (
            <>
                <MainApp className={backgroundClass} >
                    <NavBar url={this.state.url} loggedIn={this.state.loggedIn} name={this.state.name} />
                    <BigText>{"Improve Your Listening Experience"}</BigText>
                    {this.state.loggedIn ?
                        <Content playlists={this.state.playlists}/>
                    :
                        <BigButton><ButtonLink href={this.state.url}>{"Sign In"}</ButtonLink></BigButton>
                    }
                </MainApp>
                <Footer>
                    <p>{"Here is some text in the footer"}</p>
                </Footer>
            </>
        );

    }

}

export default App;
