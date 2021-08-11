import Head from 'next/head'

import {
  Grid,
  Card,
  Icon,
  Image
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
      <Navbar>
        <Grid columns='equal'>
          <Card.Group centered>
            {events.map(event => (
              <EventCard key={event.key} event={event} />
            ))}
          </Card.Group>
        </Grid>
      </Navbar>
    </>
  )
}
