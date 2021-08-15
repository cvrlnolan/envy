import React, { Component } from "react"

import {
    Button,
    Container,
    Dropdown,
    Grid,
    Divider,
    Icon,
    Menu,
} from "semantic-ui-react"

import Link from "next/link"

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
            // Application's main container
            <>
                <div>
                    {/* Desktop and tablet navigation */}
                    <Grid padded className="tablet computer only">
                        <Menu borderless fluid fixed="top" size="huge">
                            <Container>
                                <Menu.Item header>
                                    Envy
                                </Menu.Item>
                                <Link href='/' passHref>
                                    <Menu.Item as="a">
                                        Events
                                    </Menu.Item>
                                </Link>
                                <Link href='/venues' passHref>
                                    <Menu.Item as="a">Venues</Menu.Item>
                                </Link>
                                <Dropdown item text="Create">
                                    <Dropdown.Menu>
                                        <Link href='/event/create' passHref>
                                            <Dropdown.Item key="event" as="a">
                                                Event
                                            </Dropdown.Item>
                                        </Link>
                                        <Link href='/venue/create' passHref>
                                            <Dropdown.Item key="venue" as="a">
                                                Venue
                                            </Dropdown.Item>
                                        </Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Link href='https://github.com/cvrlnolan/envy' passHref>
                                    <Menu.Item as="a" target="_blank">Repository</Menu.Item>
                                </Link>
                            </Container>
                        </Menu>
                    </Grid>
                    {/* Mobile Navigation for responsiveness */}
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
                                <Link href='/' passHref><Menu.Item as="a">Events</Menu.Item></Link>
                                <Link href='/venues' passHref><Menu.Item as="a">Venues</Menu.Item></Link>
                                <Dropdown item text="Create">
                                    <Dropdown.Menu>
                                        <Link href='/event/create' passHref>
                                            <Dropdown.Item key="event" as="a">
                                                Event
                                            </Dropdown.Item>
                                        </Link>
                                        <Link href='/venue/create' passHref>
                                            <Dropdown.Item key="venue" as="a">
                                                Venue
                                            </Dropdown.Item>
                                        </Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Link href='https://github.com/cvrlnolan/envy' passHref><Menu.Item as="a" target="_blank">Repository</Menu.Item></Link>
                            </Menu>
                        </Menu>
                    </Grid>
                    <Divider hidden section />
                    <br />
                    <Container text textAlign="center">
                        {/* Rest of the application here .. */}
                        {children}
                    </Container>
                    <Divider hidden section />
                </div>
            </>
        );
    }
}

export default Navbar