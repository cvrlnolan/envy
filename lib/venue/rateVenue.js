import firebase from "@/lib/firebaseClientInit"

const db = firebase.firestore();

export default async function RateVenue(venueId, rating) {

    const venueRef = db.collection("Venues").doc(venueId); //Create document reference.

    async function rate(rating) {
        try {
            await venueRef.update({
                rating
            });
        } catch (e) {
            console.log(e);
        }
    }

    if (typeof window !== "undefined") {
        await rate(rating);
    }

}