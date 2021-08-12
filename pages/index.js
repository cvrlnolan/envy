import Head from 'next/head'
import Link from 'next/link'
import {
  Grid,
  Card,
  Button
} from "semantic-ui-react"

import Navbar from '@/components/layout/navbar'
import EventCard from '@/components/event/eventCard'

const events = [
  { key: 1, name: 'Prototype Event 1', startDate: 'Aug 11th, 2021', eventDetails: 'Prototype event for use-case testing purposes' },
  { key: 2, name: 'Prototype Event 2', startDate: 'Aug 12th, 2021', eventDetails: 'Prototype event for use-case testing purposes' },
  { key: 3, name: 'Prototype Event 3', startDate: 'Aug 13th, 2021', eventDetails: 'Prototype event for use-case testing purposes' }
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Events | Envy</title>
      </Head>
      <Navbar>
        <Grid centered>
          <Grid.Row>
            <Link href='/event/create' passHref>
              <Button primary>Create Event</Button>
            </Link>
          </Grid.Row>
        </Grid>
        <Grid centered stackable columns='equal'>
          <Card.Group centered items={events.length}>
            {events.map(event => (
              <EventCard key={event.key} event={event} />
            ))}
          </Card.Group>
        </Grid>
      </Navbar>
    </>
  )
}
