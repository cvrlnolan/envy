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
    return (
        <>
            <Modal
                trigger={
                    <Card link>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' alt="test_image" wrapped ui={false} className='card_image' />
                        <Card.Content>
                            <Card.Header>{venue.name}</Card.Header>
                            <Card.Meta>{venue.venueSpeciality}</Card.Meta>
                            <Card.Description className='card_description'>
                                <p>{venue.venueDetails}</p>
                                <Rating icon='star' maxRating={5} defaultRating={4} disabled />
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Label>
                                <Icon name="heart" color="red" />
                                0 Likes
                            </Label>
                            <Label>
                                <Icon name="comments" color="blue" />
                                0 Reviews
                            </Label>
                        </Card.Content>
                    </Card>
                }
                closeIcon
            >
                <Modal.Header>{venue.name}</Modal.Header>
                <Modal.Content image scrolling>
                    <Image wrapped src='https://react.semantic-ui.com/images/avatar/large/matthew.png' alt="event_image" rounded className='modal_image' />
                    <Modal.Description>
                        <Grid container stackable>
                            <Grid.Row columns='equal'>
                                <Grid.Column>
                                    <Button.Group icon>
                                        <Button>
                                            <Icon name="heart" />
                                        </Button>
                                        <Button>
                                            <Icon name="chat" />
                                        </Button>
                                    </Button.Group>
                                </Grid.Column>
                                <Grid.Column>
                                    <Link href="/venue/123" passHref>
                                        <Button>
                                            Venue Page
                                        </Button>
                                    </Link>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Rating icon='star' maxRating={5} defaultRating={4} disabled />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <p><b>Opened Days:</b><Label>Monday</Label> <Label>Tuesday</Label> <Label>Wednesday</Label> </p>
                                    <p><b>Exceptional Days:</b> <Label>Sunday</Label> <Label>Saturday</Label> </p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">Address</Header>
                                    <p>Venue Street Name</p>
                                    <p>City, Province</p>
                                    <p>Counrty</p>
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