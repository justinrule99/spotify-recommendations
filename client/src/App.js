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
        response: '',
        post: '',
        responseToPost: '',
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/spottoken');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("ducc");

        return body;
    };

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
