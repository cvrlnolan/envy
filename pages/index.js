import Head from 'next/head'
import Link from 'next/link'
import {
  Grid,
  Card,
  Button
} from "semantic-ui-react"

import Navbar from '@/components/layout/navbar'
import EventCard from '@/components/event/eventCard'
import LoadingCard from '@/components/layout/loadingCard'
import axios from 'axios';
import useSWR from 'swr';


export default function Home() {

  const fetcher = url => axios.get(url).then(res => res.data)

  const { data: events, error } = useSWR('/api/event/', fetcher)

  if (error) {
    return (
      <>
        <div>Error encountered...</div>
      </>
    )
  }

  //You can use custom UI Components or Semantics to show a custom loading state

  if (!events) {
    return (
      <>
        <Navbar>
          <Grid centered stackable columns='equal'>
            <Card.Group centered>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </Card.Group>
          </Grid>
        </Navbar>
      </>
    )
  }

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
          <Card.Group centered>
            {events.map(event => (
              <EventCard key={event.eventId} event={event} />
            ))}
          </Card.Group>
        </Grid>
      </Navbar>
    </>
  )
}
