import React from 'react';
import styled from 'styled-components';



const FooterMain = styled.div`
    text-align: center;
    width: 100%;
    height: 5vh;
    background: rgb(203,207,241);
    background: radial-gradient(circle, rgba(203,207,241,1) 0%, rgba(148,187,233,1) 100%);
`;

const FooterText = styled.p`
    padding-top: 50px;
    font-size: 16px;
    color: white;
`;

class Footer extends React.Component {


    render() {

        return (
            <FooterMain>
                {/*<FooterText>{"Spotify+ © 2020 Justin Rule"}</FooterText>*/}
            </FooterMain>
        );
    }
}

export default Footer;
