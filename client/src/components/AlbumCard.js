import React, {Component} from 'react';
import '../styles/AlbumCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {getPlaylistTracks} from "../util/spotify-utils";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";


// to fit on a single album card
const fixPlaylistName = (name) => {
    return name.slice(0,20);
};

class AlbumCard extends Component {
// return styled div with image inside
    // Content.js handles gridding

    state = {
        show: false,
        loadTracks: false,
        playlistTracks: null
    };

    async componentDidMount() {
        // get playlist tracks here? will get before onclick
        // if (!this.state.loadTracks) return;
        // tracks.items is array

        // do get here
        // state resets on render
        let trackResponse = await getPlaylistTracks(this.props.playlist.id);
        console.log("TRAKCS.............")
        // sprt tracks, then add to state
        let tracks = trackResponse.body.items;
        tracks.sort((a,b) => a.track.popularity > b.track.popularity ? -1 : 1);
        await this.setState({playlistTracks: tracks});
        console.log(JSON.stringify(this.state.playlistTracks, null, 2));
    }


    handleShow = () => {
        this.setState({show: true, loadTracks: true});
        this.forceUpdate();
    };
    handleClose = () => this.setState({show: false});


    render() {
        const {playlist} = this.props;
        // console.log(JSON.stringify(playlist, null, 2));
        // playlist.id: do get onClick, then re-render getPlaylistTracks()
        // sort playlistTracks[i].track.popularity

        return (
            <>
                <div className={'flip-card'}>
                    <div className={'front'}>
                        <img src={playlist.images[0].url}  alt={"Album Covers"} width={"300px"} height={"300px"} onClick={this.handleShow}/>
                    </div>
                    <div className={'back'}>
                        <h3>{fixPlaylistName(playlist.name)}</h3>
                    </div>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose} size='lg'>
                    <Modal.Header >
                        <Modal.Title id="example-modal-sizes-title-sm">{playlist.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-nav">
                            <DropdownButton className="dropdown-button" id="dropdown-basic-button" title="Dropdown button">
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </DropdownButton>
                        </div>

                        <br/>
                        {this.state.playlistTracks ?
                            this.state.playlistTracks.map((track) => (
                                    <p className="modal-text">{`${track.track.name}, ${track.track.popularity}`}</p>
                            ))
                        : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>{"Close"}</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


}


export default AlbumCard;