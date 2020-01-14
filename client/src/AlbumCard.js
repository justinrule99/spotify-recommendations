import React, {Component} from 'react';
import './AlbumCard.css';
import styled from 'styled-components';


// a single album card

const Card = styled.div`

`;

class AlbumCard extends Component {
// return styled div with image inside
    // Content.js handles gridding

    render() {
        const {album} = this.props;

        return (
            <div className={'flip-card'}>
                <div className={'front'}>
                    <img src={album.images[1].url}  alt={"Album Covers"}/>
                </div>
                <div className={'back'}>
                    <h3>{album.name}</h3>
                </div>
            </div>
        );
    }


}


export default AlbumCard;