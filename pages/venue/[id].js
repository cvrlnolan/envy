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
    Rating,
    Form,
    Comment
} from 'semantic-ui-react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import useSWR from 'swr';

import MapGL, { Marker, Popup, GeolocateControl, NavigationControl } from 'react-map-gl'

export default function VenuePage() {

    const router = useRouter()
    const { id } = router.query

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data: venue, error } = useSWR(() => '/api/venue/' + id, fetcher)

    if (error) {
        return (
            <>
                <div>Error encountered...</div>
            </>
        )
    }

    if (!venue) {
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Venue Page | Envy</title>
            </Head>
            <Navbar>
                <Segment raised padded>
                    <Grid container centered stackable>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Image src={venue.venueImgUrl} alt="test_image" wrapped ui={false} rounded className='page_image' />
                            </Grid.Column>
                            <Grid.Column>
                                <Header>
                                    <Header.Content>{venue.venueName}</Header.Content>
                                    <Header.Subheader>{venue.venueCategory}</Header.Subheader>
                                </Header>
                                <Header as="h4">Schedule</Header>
                                <p>Opened Days: {venue.openingDays.map(day => (<Label key={day}>{day}</Label>))} </p>
                                <p>Exceptional Days: {venue.exceptionalDays.map(day => (<Label key={day}>{day}</Label>))}</p>
                                <Header as="h4">Address</Header>
                                <p>{venue.venueStreet}, {venue.venueCity}</p>
                                <p>{venue.venueProvince}, {venue.venueCountry}</p>
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
                                        <Modal.Header>Reviews</Modal.Header>
                                        <Modal.Content scrolling>
                                            <Modal.Description>
                                                <Comment.Group>
                                                    <VenueReviews />
                                                </Comment.Group>
                                                <Form>
                                                    <Form.TextArea />
                                                    <Button primary>Post Review</Button>
                                                </Form>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                    <Modal
                                        trigger={
                                            <Button as="div" labelPosition="right">
                                                <Button>
                                                    <Icon name="star" />
                                                </Button>
                                                <Label as='a' basic pointing='left'>
                                                    3.5
                                                </Label>
                                            </Button>
                                        }
                                        size="small"
                                        closeIcon
                                    >
                                        <Modal.Header>Rate Us</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <Grid container padded centered>
                                                    <Rating size="huge" icon='star' maxRating={5} defaultRating={3.5} />
                                                </Grid>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h4">Description</Header>
                                <p>{venue.venueDetails}</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h4">Contact</Header>
                                <p>{venue.venueTelephone}</p>
                                <p>{venue.venueEmail}</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <MapView long={venue.lng} lat={venue.lat} />
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Navbar>
        </>
    )
}

const VenueReviews = () => {
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