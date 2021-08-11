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

const EventCard = ({ event }) => {
    return (
        <>
            <Modal
                trigger={
                    <Card link>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' alt="test_image" wrapped ui={false} className='event_card_image' />
                        <Card.Content>
                            <Card.Header>{event.name}</Card.Header>
                            <Card.Meta>{event.startDate}</Card.Meta>
                            <Card.Description className='event_card_description'>{event.eventDetails}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Label>
                                <Icon name="heart" color="red" />
                                0 Likes
                            </Label>
                            <Label>
                                <Icon name="comments" color="blue" />
                                0 Comments
                            </Label>
                        </Card.Content>
                    </Card>
                }
                closeIcon
            >
                <Modal.Header>{event.name}</Modal.Header>
                <Modal.Content image scrolling>
                    <Image wrapped src='https://react.semantic-ui.com/images/avatar/large/matthew.png' alt="event_image" rounded className='modal_event_image' />
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
                                    <Button>
                                        Event Page
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">Date and Time</Header>
                                    <p>Event Start Date/Time - Event End Date/Time</p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">Address</Header>
                                    <p>Venue, Street Name</p>
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

export default EventCard