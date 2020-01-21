import React, {Component} from 'react';
import '../styles/Content.css';
import AlbumCard from "./AlbumCard";
import styled from 'styled-components';
import {getTopTracks} from "../util/spotify-utils";


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

    async componentDidMount() {

        // add images to props
        // console.log(JSON.stringify(crxAlbums.items[0].images[0], null, 2));

        // let albums = getTopTracks('3l0CmX0FuQjFxr8SK7Vqag');
        let albums = [];


        this.setState({
            testAlbums: albums
        });

    }

    render () {
        const {playlists} = this.props;


        return (
            <>
                <BigText>{"Improve Your Listening Experience"}</BigText>


                <CardContainer>
                    {playlists.map((playlist) => (
                        <AlbumCard album={playlist} key={playlist.id} />
                    ))}
                </CardContainer>
            </>
        );
    }
}

export default Content;