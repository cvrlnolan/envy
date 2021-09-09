import React from "react"
import {
    Grid,
    Header,
    Card,
    Image,
    Modal,
    Button,
    Icon,
    Label,
    Rating
} from "semantic-ui-react"
import Link from "next/link"

const VenueCard = ({ venue }) => {

    let trimString = function (string, length) {
        return string.length > length ?
            string.substring(0, length) + "..." :
            string;
    };

    return (
        <>
            <Modal
                trigger={
                    <Card link>
                        {/* Alternatively use next/image component for more optimization purposes */}
                        <Image
                            src={venue.venueImgUrl}
                            alt="test_image"
                            wrapped
                            className='card_image'
                        />
                        <Card.Content>
                            <Card.Header>{venue.venueName}</Card.Header>
                            <Card.Meta>{venue.venueSpecialty.map(specialty => (specialty))}</Card.Meta>
                            <Card.Description className='card_description'>
                                <p>{trimString(venue.venueDetails, 50)}</p>
                                <Rating icon='star' maxRating={5} defaultRating={venue.rating} disabled />
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Label>
                                <Icon name="heart" color="red" />
                                {venue.likes ? venue.likes : 0} Likes
                            </Label>
                            <Label>
                                <Icon name="comments" color="blue" />
                                {venue.reviews ? venue.reviews : 0} Reviews
                            </Label>
                        </Card.Content>
                    </Card>
                }
                closeIcon
            >
                <Modal.Header>{venue.venueName}</Modal.Header>
                <Modal.Content image scrolling>
                    {/* Alternatively use next/image component for more optimization purposes */}
                    <Image
                        wrapped
                        src={venue.venueImgUrl}
                        alt="event_image"
                        rounded
                        className='modal_image'
                    />
                    <Modal.Description>
                        <Grid container stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Link href={`/venue/${venue.venueId}`} passHref>
                                        <Button>
                                            Venue Page
                                        </Button>
                                    </Link>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Rating icon='star' maxRating={5} defaultRating={venue.rating} disabled />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <p><b>Opened Days:</b>{venue.openingDays.map(day => (<Label key={day}>{day}</Label>))} </p>
                                    <p><b>Exceptional Days:</b> {venue.exceptionalDays.map(day => (<Label key={day}>{day}</Label>))}</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">Address</Header>
                                    <p>{venue.venueStreet}, {venue.venueCity}</p>
                                    <p>{venue.venueProvince}, {venue.venueCountry}</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default VenueCard