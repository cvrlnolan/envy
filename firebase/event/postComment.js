import firebase from "@/firebase/firebaseClientInit";

const db = firebase.firestore();
const batch = db.batch();

export default async function PostComment(eventId, commentData) {

    const eventRef = db.collection("Events").doc(eventId); //Create document reference.

    const commentRef = eventRef.collection("Comments").doc(); // Create subcollection document reference.

    async function post(comment) {
        try {
            batch.set(commentRef, {
                id: commentRef.id,
                message: comment.comment,
                createdDate: firebase.firestore.Timestamp.fromDate(new Date())
            });
            batch.update(eventRef, {
                comments: firebase.firestore.FieldValue.increment(1)
            });
            await batch.commit();
        } catch (e) {
            console.log(e)
        }
    }

    if (typeof window !== "undefined") {
        await post(commentData);
    }
}