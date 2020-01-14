import React, {Component} from 'react';
import './NavBar.css';
import request from 'request';


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
    render () {
        return (
            <>
                <List>
                    <ListItem><NavLink href='#'>{"Home"}</NavLink></ListItem>
                    <ListItem><NavLink href='#'>{"About"}</NavLink></ListItem>
                    <ListItem><NavLink href='#'>{"Sign In"}</NavLink></ListItem>
                </List>
            </>
        );
    }
}

export default NavBar;