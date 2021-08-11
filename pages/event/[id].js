import Navbar from '@/components/layout/navbar'
import {
    Container,
    Segment,
    Grid,
    Header,
    Image,
    Button,
    Label,
    Icon,
    Modal,
    Form,
    Comment
} from 'semantic-ui-react'
import { useState } from 'react'

import MapGL, { Marker, Popup, GeolocateControl, NavigationControl } from 'react-map-gl'

import PaypalButton from '@/components/paypal/paypalButton'

export default function EventPage() {
    return (
        <>
            <Navbar>
                <Container text textAlign="center">
                    <Segment raised padded>
                        <Grid centered stackable>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' alt="test_image" wrapped ui={false} rounded className='page_image' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header>
                                        <Header.Content>Event Name</Header.Content>
                                        <Header.Subheader>Event Category</Header.Subheader>
                                    </Header>
                                    <Header as="h4">Date and Time</Header>
                                    <p>Event Start Date - Event End Date</p>
                                    <Header as="h4">Address</Header>
                                    <p>Venue, Street Name</p>
                                    <p>City, Province</p>
                                    <p>Counrty</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Button.Group icon>
                                        <Button as="div" labelPosition="right">
                                            <Button>
                                                <Icon name="heart" />
                                            </Button>
                                            <Label as='a' basic pointing='left'>
                                                0
                                            </Label>
                                        </Button>
                                        <Modal
                                            trigger={
                                                <Button as="div" labelPosition="right">
                                                    <Button>
                                                        <Icon name="chat" />
                                                    </Button>
                                                    <Label as='a' basic pointing='left'>
                                                        0
                                                    </Label>
                                                </Button>
                                            }
                                            closeIcon
                                        >
                                            <Modal.Header>Comments</Modal.Header>
                                            <Modal.Content image scrolling>
                                                <Modal.Description>
                                                    <Comment.Group>
                                                        <EventComments />
                                                    </Comment.Group>
                                                    <Form>
                                                        <Form.TextArea />
                                                        <Button primary>Send Message</Button>
                                                    </Form>
                                                </Modal.Description>
                                            </Modal.Content>
                                        </Modal>
                                    </Button.Group>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">Description</Header>
                                    <p>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">Contact</Header>
                                    <p>+237 696 74 0298</p>
                                    <p>blackhxxdini@gmail.com</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">Ticket</Header>
                                    <Ticket />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <MapView />
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Container>
            </Navbar>
        </>
    )
}

const EventComments = () => {
    return (
        <>
            <Comment>
                <Comment.Content>
                    <Comment.Avatar src="" />
                    <Comment.Text>Text comment for use-case scenario</Comment.Text>
                    <Comment.Metadata>
                        Aug 11th, 2021
                    </Comment.Metadata>
                </Comment.Content>
            </Comment>
        </>
    )
}

const Ticket = () => {
    return (
        <>
            <Modal
                trigger={
                    <Label as="a" tag>
                        $10
                    </Label>
                }
            >
                <Modal.Header>Purchase Ticket</Modal.Header>
                <Modal.Content image scrolling>
                    <Grid stackable container textAlign="center">
                        <Grid.Row>
                            <Grid.Column>
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input label="Quantity" type="number" min={1} />
                                        <Form.Input label="Name" type="text" />
                                        <Form.Input label="Email Address" type="email" />
                                    </Form.Group>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button>Mobile Payment</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <PaypalButton />
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
            </Modal>
        </>
    )
}

const MapView = () => {

    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_REACT_MGL_API_TOKEN

    const [viewport, setViewport] = useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0
    })

    const [showPop, setShowPop] = useState(true)


    return (
        <>
            <MapGL
                {...viewport}
                width="80vw"
                height="50vh"
                mapStyle={process.env.NEXT_PUBLIC_REACT_MGL_MAPSTYLE}
                onViewportChange={setViewport}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <div style={{ position: 'absolute' }}>
                    <NavigationControl />
                </div>
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                />
                <Marker longitude={-122.4} latitude={37.8} offsetLeft={-20} offsetTop={-10}>
                    <Icon name='map pin' color='red' />
                </Marker>

                <Popup
                    latitude={37.8}
                    longitude={-122.4}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setShowPop(false)}
                    anchor="top">
                    <div>Event taking place here</div>
                </Popup>
            </MapGL>
        </>
    )
}