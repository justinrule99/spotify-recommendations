import React from 'react';
import '../styles/App.css';
import NavBar from "./NavBar";
import Content from "./Content";
import styled from 'styled-components';
import {getAuthUrl} from "../util/spotify-utils";

const MainApp = styled.div`
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(43,130,76,1) 35%, rgba(0,212,255,1) 100%);
    width: 100%;
`;


class App extends React.Component {
    state = {
        url: '',
    };

    async componentDidMount() {

        const url = await getAuthUrl();
        console.log(url);
        this.setState({url});

        // only get stuff if signed in


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
