import React, {Component} from 'react';
import '../styles/AlbumCard.css';
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
                    <img src={album.images[0].url}  alt={"Album Covers"} width={"300px"} height={"300px"}/>
                </div>
                <div className={'back'}>
                    <h3>{album.name}</h3>
                </div>
            </div>
        );
    }


}


export default AlbumCard;