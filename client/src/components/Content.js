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

    // should we fetch in App.js?
    // where to authenticate with spotify?
    // should do all server side in node layer (separate project)
    async componentDidMount() {




        // add images to props
        // console.log(JSON.stringify(crxAlbums.items[0].images[0], null, 2));

        let albums = getTopTracks('3l0CmX0FuQjFxr8SK7Vqag');


        this.setState({
            testAlbums: albums
        });



    }

    render () {

        return (
            <>
                <BigText>{"Improve Your Listening Experience"}</BigText>

                <form>
                    <label>
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

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