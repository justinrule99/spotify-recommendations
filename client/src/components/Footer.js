import React from 'react';
import styled from 'styled-components';



const FooterMain = styled.div`
    width: 100%;
    height: 200px;
`;

class Footer extends React.Component {


    render() {

        return (
            <FooterMain>
                <p>{"Some Footer text"}</p>
            </FooterMain>
        );
    }
}

export default Footer;