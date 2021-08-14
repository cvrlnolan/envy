import Head from 'next/head'
import Link from 'next/link'
import {
    Grid,
    Card,
    Button
} from "semantic-ui-react"

import Navbar from '@/components/layout/navbar'
import VenueCard from '@/components/venue/venueCard'
import LoadingCard from '@/components/layout/loadingCard'
import axios from 'axios';
import useSWR from 'swr';


export default function Venues() {

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data: venues, error } = useSWR('/api/venue/', fetcher)

    if (error) {
        return (
            <>
                <div>Error encountered...</div>
            </>
        )
    }

    //You can use custom UI Components or Semantics to show a custom loading state

    if (!venues) {
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
                <title>Venues | Envy</title>
            </Head>
            <Navbar>
                <Grid centered>
                    <Grid.Row>
                        <Link href='/venue/create' passHref>
                            <Button primary>Register Venue</Button>
                        </Link>
                    </Grid.Row>
                </Grid>
                <Grid centered stackable columns='equal'>
                    <Card.Group centered>
                        {venues.map(venue => (
                            <VenueCard key={venue.venueId} venue={venue} />
                        ))}
                    </Card.Group>
                </Grid>
            </Navbar>
        </>
    )
}