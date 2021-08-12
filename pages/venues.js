import Head from 'next/head'
import Link from 'next/link'
import {
    Grid,
    Card,
    Button
} from "semantic-ui-react"

import Navbar from '@/components/layout/navbar'
import VenueCard from '@/components/venue/venueCard'

const venues = [
    { key: 1, name: 'Prototype Venue 1', venueSpeciality: 'Cocktails', venueDetails: 'Prototype venue for use-case testing purposes' },
    { key: 2, name: 'Prototype Venue 2', venueSpeciality: 'Grillades', venueDetails: 'Prototype venue for use-case testing purposes' },
    { key: 3, name: 'Prototype Venue 3', venueSpeciality: 'Disco Music', venueDetails: 'Prototype venue for use-case testing purposes' }
]

export default function Venues() {
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
                    <Card.Group centered items={venues.length}>
                        {venues.map(venue => (
                            <VenueCard key={venue.key} venue={venue} />
                        ))}
                    </Card.Group>
                </Grid>
            </Navbar>
        </>
    )
}