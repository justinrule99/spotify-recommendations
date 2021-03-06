import React, {Component} from 'react';
import '../styles/NavBar.css';



import styled from 'styled-components';


const List = styled.ul`
    padding-top: 30px;
    list-style-type: none;
`;

const ListItem = styled.li`
    display: inline;
    padding: 20px;
`;

const NavLink = styled.a`
    color: white;
    font-size: 24px;
    text-decoration: none;
`;

class NavBar extends Component {

C
    async componentDidMount() {
    }

    render () {
        const {name} = this.props;
        const {loggedIn} = this.props;

        const {url} = this.props;
        const buttonText = loggedIn ? name : "Sign In";

        return (
            <>
                <List>
                    <ListItem><NavLink href='#'>{"Home"}</NavLink></ListItem>
                    <ListItem><NavLink href='#'>{"Stats"}</NavLink></ListItem>
                    <ListItem><NavLink href='#'>{"Player"}</NavLink></ListItem>
                    <ListItem><NavLink href={url}>{buttonText}</NavLink></ListItem>
                </List>
            </>
        );
    }
}

export default NavBar;