import firebase from '@/firebase/firebaseClientInit'

const db = firebase.firestore()

export default async function RateVenue(venueId, rating) {

    const venueRef = db.collection("Venues").doc(venueId)

    async function rate(rating) {
        try {
            await venueRef.update({
                rating
            })
        } catch (e) {
            console.log(e)
        }
    }

    if (typeof window !== 'undefined') {
        await rate(rating)
    }

}