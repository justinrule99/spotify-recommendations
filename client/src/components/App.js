import React from 'react';
import '../styles/App.css';
import NavBar from "./NavBar";
import Content from "./Content";
import styled from 'styled-components';
import {getAuthUrl, getMe, getTopTracks, getUserPlaylists, sendTokenAndAuthenticate} from "../util/spotify-utils";
import background from '../images/back-3.jpg';


// change img if logged in
const MainApp = styled.div`
    // background: rgb(2,0,36);
    // background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(43,130,76,1) 35%, rgba(0,212,255,1) 100%);
    // background-image: url("https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-image: url(${background});
    // background-repeat: no-repeat;
    background-size: 100% 1000px;
    width: 100%;
`;

const Footer = styled.div`
    width: 100%;
    height: 200px;
   
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

        // console.log(window.location.href);
        // parse string between = and &
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
            console.log(myPlaylists);
            this.setState({playlists: myPlaylists.body.items});

        }



        // only get stuff if signed in
        // need to get query params and do a post request
        // attempt to send code from url, if no code, either already signed in or not signed in


    }

    render() {
        return (
            <>
                <MainApp className="App">
                    <NavBar url={this.state.url} loggedIn={this.state.loggedIn} name={this.state.name} />
                    <Content playlists={this.state.playlists}/>
                    <Footer>
                        <p>{"Here is some text in the footer"}</p>
                    </Footer>
                </MainApp>
            </>
        );

    }

}

export default App;
