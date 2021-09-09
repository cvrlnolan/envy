import React from "react"
import Head from "next/head"
import Navbar from "@/components/layout/navbar"
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
} from "semantic-ui-react"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import useSWR from "swr"
import moment from "moment"

import MapGL,
{
    Marker,
    Popup,
    GeolocateControl,
    NavigationControl
} from "react-map-gl"

import PaypalButton from "@/components/paypal/paypalButton"

import LikeEvent from "@/firebase/event/likeEvent"

import PostComment from "@/firebase/event/postComment"

export default function EventPage() {

    const router = useRouter()
    const { id } = router.query

    const [value, setValue] = useState({
        comment: ""
    })

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data: event, error } = useSWR(() => "/api/event/" + id, fetcher) //Fetch data while keeping the UI reactive.

    if (error) {
        return (
            <>
                <div>Error encountered...</div>
            </>
        )
    }

    //You can use custom UI Components or Semantics to show a custom loading state

    if (!event) {
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }

    const onChange = (e) => {
        const { value, name } = e.target;
        setValue(prevState => ({ ...prevState, [name]: value }));
    }

    const onPost = async () => {
        try {
            await PostComment(event.eventId, value).then(() => {
                setValue('')
            })
        } catch (e) {
            console.log(e)
        }
    }

    const onLike = async () => {
        try {
            await LikeEvent(event.eventId)
        } catch (e) {
            console.log(e)
        }
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
                                {/* Alternatively use next/image component for more optimization purposes */}
                                <Image centered src={event.eventImgUrl} alt="test_image" wrapped rounded className='page_image' />
                            </Grid.Column>
                            <Grid.Column>
                                <Header>
                                    <Header.Content>{event.eventName}</Header.Content>
                                    <Header.Subheader>{event.eventCategory}</Header.Subheader>
                                </Header>
                                <p>{event.eventType.map(type => (`#${type} `))}</p>
                                <Header as="h4">Date and Time</Header>
                                <p>{event.startDate} {event.startTime} - {event.endDate} {event.endTime}</p>
                                <Header as="h4">Address</Header>
                                <p>{event.eventVenue}, {event.eventStreet}</p>
                                <p>{event.eventCity}, {event.eventProvince}</p>
                                <p>{event.eventCountry}</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button.Group icon>
                                    <Button as="div" labelPosition="right">
                                        <Button onClick={onLike}>
                                            <Icon name="heart" />
                                        </Button>
                                        <Label as='a' basic pointing='left'>
                                            {event.likes ? event.likes : 0}
                                        </Label>
                                    </Button>
                                    <Modal
                                        trigger={
                                            <Button as="div" labelPosition="right">
                                                <Button>
                                                    <Icon name="chat" />
                                                </Button>
                                                <Label as='a' basic pointing='left'>
                                                    {event.comments ? event.comments : 0}
                                                </Label>
                                            </Button>
                                        }
                                        closeIcon
                                    >
                                        <Modal.Header>Comments</Modal.Header>
                                        <Modal.Content image scrolling>
                                            <Modal.Description>
                                                <Comment.Group>
                                                    <EventComments eventId={event.eventId} />
                                                </Comment.Group>
                                                <Form onSubmit={onPost}>
                                                    <Form.TextArea name="comment" placeholder="Enter comment..." value={value.comment} onChange={onChange} required />
                                                    <Button primary type="submit">Send Message</Button>
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

const EventComments = (props) => {
    const { eventId } = props
    const fetcher = url => axios.get(url).then(res => res.data)

    const { data: comments, error } = useSWR(() => '/api/event/comments/' + eventId, fetcher)

    if (error) {
        return (
            <>
                <div>Error encountered...</div>
            </>
        )
    }

    if (!comments) {
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }

    return (
        <>
            {comments.map(comment =>
            (<Comment key={comment.id}>
                <Comment.Content>
                    <Comment.Avatar src="" />
                    <Comment.Text>{comment.message}</Comment.Text>
                    <Comment.Metadata>
                        {moment(comment.createdDate._seconds * 1000).format("MMM DD, YYYY")}
                    </Comment.Metadata>
                </Comment.Content>
            </Comment>))}
        </>
    )
}

const Ticket = (props) => {

    const { ticket } = props

    const [data, setData] = useState({
        name: '',
        email: '',
        quantity: 1
    })

    const onChange = (e) => {
        const { value, name } = e.target;
        setData(prevState => ({ ...prevState, [name]: value }));
    }

    // Check https://monetbil.com Documentation to know more about their payment API..
    // It is straight forward and only serves via https protocol ..
    const mobileUrl = 'https://api.monetbil.com/widget/v2.1/' + process.env.NEXT_PUBLIC_MONETBIL_SERVICE_KEY + '?amount=' + 5000

    // Optionally you can validate emails using this Regex Pattern 
    // var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

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
                        {!ticket && <p>Ticket is free hence no purchase needed.</p>}
                        <Grid.Row>
                            <Grid.Column>
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input label="Quantity" type="number" name="quantity" min={1} value={data.quantity} onChange={onChange} />
                                        <Form.Input label="Name" type="text" name="name" value={data.name} onChange={onChange} />
                                        <Form.Input label="Email Address" type="email" name="email" value={data.email} onChange={onChange} />
                                    </Form.Group>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button as="a" href={mobileUrl} secondary target="_blank" rel="noreferrer" disabled={ticket ? false : true}>Mobile Payment</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <PaypalButton ticket={ticket} name={data.name} quantity={data.quantity} email={data.email} />
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
                <Marker longitude={long} latitude={lat} offsetLeft={-20} offsetTop={-10}>
                    <Icon name='map pin' color='red' />
                </Marker>

                <Popup
                    latitude={lat}
                    longitude={long}
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

//Optionally you can render all the event pages on build time via SSG

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