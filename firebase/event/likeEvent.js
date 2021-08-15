import firebase from "@/firebase/firebaseClientInit";

const db = firebase.firestore();

export default async function LikeEvent(eventId) {

    const eventRef = db.collection("Events").doc(eventId); //Create document reference.

    async function like() {
        try {
            await eventRef.update({
                likes: firebase.firestore.FieldValue.increment(1)
            })
        } catch (e) {
            console.log(e)
        }
    }

    if (typeof window !== "undefined") {
        await like();
    }

}