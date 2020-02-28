import React, {Component} from 'react';
import '../styles/AlbumCard.css';
import styled from 'styled-components';


// to fit on a single album card
const fixPlaylistName = (name) => {
    return name.slice(0,20);
};

class AlbumCard extends Component {
// return styled div with image inside
    // Content.js handles gridding



    render() {
        const {playlist} = this.props;

        const imageClick = () => {
            console.log("click");
        };

        return (
            <div className={'flip-card'}>
                <div className={'front'}>
                    <img src={playlist.images[0].url}  alt={"Album Covers"} width={"300px"} height={"300px"} onClick={imageClick}/>
                </div>
                <div className={'back'}>
                    <h3>{fixPlaylistName(playlist.name)}</h3>
                </div>
            </div>
        );
    }


}


export default AlbumCard;