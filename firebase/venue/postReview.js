import firebase from "@/firebase/firebaseClientInit";

const db = firebase.firestore();
const batch = db.batch();

export default async function PostReview(venueId, reviewData) {

    const venueRef = db.collection("Venues").doc(venueId); //Create document reference.

    const reviewsRef = venueRef.collection("Reviews").doc(); //Create sub-collection document reference.

    async function post(review) {
        try {
            batch.set(reviewsRef, {
                id: reviewsRef.id,
                message: review.review,
                createdDate: firebase.firestore.Timestamp.fromDate(new Date())
            });
            batch.update(venueRef, {
                reviews: firebase.firestore.FieldValue.increment(1)
            });
            await batch.commit();
        } catch (e) {
            console.log(e);
        }
    }

    if (typeof window !== "undefined") {
        await post(reviewData);
    }

}