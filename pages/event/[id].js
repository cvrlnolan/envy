import Head from 'next/head'
import Navbar from '@/components/layout/navbar'
import {
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
import { useRouter } from 'next/router'
import axios from 'axios';
import useSWR from 'swr';

import MapGL, { Marker, Popup, GeolocateControl, NavigationControl } from 'react-map-gl'

import PaypalButton from '@/components/paypal/paypalButton'

export default function EventPage() {

    const router = useRouter()
    const { id } = router.query

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data: event, error } = useSWR(() => '/api/event/' + id, fetcher)

    if (error) {
        return (
            <>
                <div>Error encountered...</div>
            </>
        )
    }

    if (!event) {
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Event Page | Envy</title>
            </Head>
            <Navbar>
                <Segment raised padded>
                    <Grid container centered stackable>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Image src={event.eventImgUrl} alt="test_image" wrapped ui={false} rounded className='page_image' />
                            </Grid.Column>
                            <Grid.Column>
                                <Header>
                                    <Header.Content>{event.eventName}</Header.Content>
                                    <Header.Subheader>{event.eventCategory}</Header.Subheader>
                                </Header>
                                <Header as="h4">Date and Time</Header>
                                <p>{event.startDate} {event.startTime} - {event.endDate} {event.endTime}</p>
                                <Header as="h4">Address</Header>
                                <p>{event.eventVenue}, {event.eventStreet}</p>
                                <p>{event.eventCity}, {event.eventProvince}</p>
                                <p>{event.eventProvince}</p>
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
                                <p>{event.eventDetails}</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h4">Contact</Header>
                                <p>{event.eventTelephone}</p>
                                <p>{event.eventEmail}</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h4">Ticket</Header>
                                <Ticket ticket={event.ticket} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <MapView long={event.lng} lat={event.lat} />
                        </Grid.Row>
                    </Grid>
                </Segment>
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

const Ticket = (props) => {

    const { ticket } = props

    return (
        <>
            <Modal
                trigger={
                    <Label as="a" tag>
                        {ticket ? '$10' : 'Free'}
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

const MapView = (props) => {

    const { long, lat } = props

    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_REACT_MGL_API_TOKEN

    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
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

// export async function getStaticPaths() {
//     const events = await fetch('http://localhost:3000/api/event')
//     const eventsData = await events.json()

//     const paths = eventsData.map((event) => ({
//         params: { id: event.eventId },
//     }))

//     return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//     const event = await fetch(`/api/event/${params.id}`)
//     const eventData = await event.json()

//     return { props: { eventData } }
// }