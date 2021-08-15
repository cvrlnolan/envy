import firebase from "@/firebase/firebaseClientInit";

const db = firebase.firestore();

export default async function LikeVenue(venueId) {

    const venueRef = db.collection("Venues").doc(venueId); //Create document reference.

    async function like() {
        try {
            await venueRef.update({
                likes: firebase.firestore.FieldValue.increment(1)
            })
        } catch (e) {
            console.log(e);
        }
    }

    if (typeof window !== "undefined") {
        await like();
    }
}