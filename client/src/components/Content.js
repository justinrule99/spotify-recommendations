import React, {Component} from 'react';
import '../styles/Content.css';
import AlbumCard from "./AlbumCard";
import styled from 'styled-components';




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
        let albums = [];

        this.setState({
            testAlbums: albums,
            ...this.state
        });

    }

    // onclick of albumCard, launch modal

    render () {
        const {playlists} = this.props;

        return (
            <>
                <CardContainer>
                    {playlists.map((playlist) => (
                        <AlbumCard playlist={playlist} key={playlist.id} />
                    ))}
                </CardContainer>
            </>
        );
    }
}

export default Content;