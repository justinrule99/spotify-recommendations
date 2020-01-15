import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import Content from "./Content";
import styled from 'styled-components';

const MainApp = styled.div`
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(43,130,76,1) 35%, rgba(0,212,255,1) 100%);
    width: 100%;
`;

class App extends React.Component {
    state = {
        loggedIn: false,
        response: '',
        post: '',
        responseToPost: '',
    };

    async componentDidMount() {


        const url = await this.getAuthUrl();
        console.log(url);
        //
        // this.getToken()
        //     .then(res => this.setState({ response: res.express }))
        //     .catch(err => console.log(err));
        //
        // const tokenRes = await this.getToken();
        // this.setState({ response: tokenRes.express });
        //
        // const topTracks = await this.getTopTracks();

    }

    getAuthUrl = async () => {
        const response = await fetch('/api/login');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log('succ');
        return body;
    };

    getToken = async () => {
        const response = await fetch('/api/token');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("ducc");

        return body;
    };

    getTopTracks = async () => {
        const response = await fetch('/api/toptracks/0epOFNiUfyON9EYx7Tpr6V');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log('gottem');
        console.log(body);

        return body;
    };

    // redirect based on state of logged in
    render() {
        return (
            <MainApp className="App">
                <NavBar />
                <Content />
                <p>{"State:"}</p>
            </MainApp>
        );

    }

}

export default App;
