import React, { Component } from "react";

import {
    Button,
    Container,
    Dropdown,
    Grid,
    Header,
    Divider,
    Icon,
    Menu,
    Message
} from "semantic-ui-react";

class Navbar extends Component {
    state = {
        dropdownMenuStyle: {
            display: "none"
        }
    };

    handleToggleDropdownMenu = () => {
        let newState = Object.assign({}, this.state);
        if (newState.dropdownMenuStyle.display === "none") {
            newState.dropdownMenuStyle = { display: "flex" };
        } else {
            newState.dropdownMenuStyle = { display: "none" };
        }

        this.setState(newState);
    };

    render() {

        const { children } = this.props

        return (
            <div>
                <Grid padded className="tablet computer only">
                    <Menu borderless fluid fixed="top" size="huge">
                        <Container>
                            <Menu.Item header as="a">
                                Envy
                            </Menu.Item>
                            <Menu.Item active as="a">
                                Home
                            </Menu.Item>
                            <Menu.Item as="a">Venues</Menu.Item>
                            <Menu.Item as="a">Contact</Menu.Item>
                            <Dropdown item text="Dropdown">
                                <Dropdown.Menu>
                                    <Dropdown.Item as="a" href="#root">
                                        Action
                                    </Dropdown.Item>
                                    <Dropdown.Item as="a" href="#root">
                                        Another Action
                                    </Dropdown.Item>
                                    <Dropdown.Item as="a" href="#root">
                                        Something else here
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Header>Navbar header</Dropdown.Header>
                                    <Dropdown.Item as="a" href="#root">
                                        Separated link
                                    </Dropdown.Item>
                                    <Dropdown.Item as="a" href="#root">
                                        One more separated link
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>
                    </Menu>
                </Grid>
                <Grid padded className="mobile only">
                    <Menu borderless fluid fixed="top" size="huge">
                        <Menu.Item header as="a">
                            Envy
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button
                                    icon
                                    basic
                                    toggle
                                    onClick={this.handleToggleDropdownMenu}
                                >
                                    <Icon name="content" />
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu
                            vertical
                            borderless
                            fluid
                            style={this.state.dropdownMenuStyle}
                        >
                            <Menu.Item active as="a">
                                Home
                            </Menu.Item>
                            <Menu.Item as="a">About</Menu.Item>
                            <Menu.Item as="a">Contact</Menu.Item>
                        </Menu>
                    </Menu>
                </Grid>
                <Divider hidden section />
                <br />
                <Grid padded container centered>
                    {children}
                </Grid>
                <Divider hidden section />
            </div>
        );
    }
}

export default Navbar