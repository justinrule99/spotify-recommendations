import React from 'react';
import '../styles/App.css';
import NavBar from "./NavBar";
import Content from "./Content";
import styled from 'styled-components';
import {getAuthUrl, sendTokenAndAuthenticate} from "../util/spotify-utils";

const MainApp = styled.div`
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(43,130,76,1) 35%, rgba(0,212,255,1) 100%);
    width: 100%;
`;


class App extends React.Component {
    state = {
        loggedIn: false,
        url: '',
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

        if (code !== '') {
            // do post request for token
            const token = await sendTokenAndAuthenticate();
        }



        // only get stuff if signed in
        // need to get query params and do a post request
        // attempt to send code from url, if no code, either already signed in or not signed in


    }

    render() {
        return (
            <>
                <MainApp className="App">
                    <NavBar url={this.state.url}/>
                    <Content />
                </MainApp>
            </>
        );

    }

}

export default App;
