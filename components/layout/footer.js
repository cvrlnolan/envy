import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import { Container } from "semantic-ui-react";

class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <Container>
                        <p>Developed by <a href="https://carlnolan.lootyclub.com" target="_blank" rel="noreferrer">Carl Nolan.</a></p>
                    </Container>
                </footer>
            </div>
        );
    }
}

export default Footer;