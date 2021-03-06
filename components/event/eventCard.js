import React from "react"
import {
    Grid,
    Header,
    Card,
    Image,
    Modal,
    Button,
    Icon,
    Label
} from "semantic-ui-react"
import Link from "next/link"

const EventCard = ({ event }) => {

    let trimString = function (string, length) {
        return string.length > length ?
            string.substring(0, length) + "..." :
            string;
    };

    return (
        <>
            <Modal
                trigger={
                    <Card data-testid="openModal" link>
                        {/* Alternatively use next/image component for more optimization purposes */}
                        <Image
                            src={event.eventImgUrl}
                            alt="test_image"
                            wrapped
                            className='card_image'
                        />
                        <Card.Content>
                            <Card.Header>{event.eventName}</Card.Header>
                            <Card.Meta>{event.startDate}</Card.Meta>
                            <Card.Description className='card_description'><p>{trimString(event.eventDetails, 50)}</p></Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Label>
                                <Icon name="heart" color="red" />
                                {event.likes ? event.likes : 0} Likes
                            </Label>
                            <Label>
                                <Icon name="comments" color="blue" />
                                {event.comments ? event.comments : 0} Comments
                            </Label>
                        </Card.Content>
                    </Card>
                }
                closeIcon
            >
                <Modal.Header>{event.eventName}</Modal.Header>
                <Modal.Content image scrolling>
                    {/* Alternatively use next/image component for more optimization purposes */}
                    <Image
                        wrapped
                        src={event.eventImgUrl}
                        alt="event_image"
                        rounded
                        className='modal_image' />
                    <Modal.Description>
                        <Grid container stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Link href={`/event/${event.eventId}`} passHref>
                                        <Button>
                                            Event Page
                                        </Button>
                                    </Link>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">Date and Time</Header>
                                    <p>{event.startDate} {event.startTime} - {event.endDate} {event.endTime}</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">Address</Header>
                                    <p>{event.eventVenue}, {event.eventStreet}</p>
                                    <p>{event.eventCity}, {event.eventProvince}</p>
                                    <p>{event.eventCountry}</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default EventCard