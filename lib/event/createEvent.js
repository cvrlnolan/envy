import firebase from "@/lib/firebaseClientInit";

const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

export default async function InsertEvent(imageData, eventData) {

    const eventRef = db.collection("Events").doc(); //Create document reference.

    async function insert(image, event) {
        try {
            await storageRef.child(`Events/${eventRef.id}`).put(image).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    eventRef.set({
                        ...event,
                        eventTelephone: `${event.phoneExt}${event.eventPhone}`,
                        eventTicket: event.tickets ? 100 : 0,
                        eventImgUrl: url,
                        eventId: eventRef.id,
                        formattedEndDate: firebase.firestore.Timestamp.fromDate(new Date(`${event.endDate} ${event.endTime}`)),
                        createdDate: firebase.firestore.Timestamp.fromDate(new Date())
                    })
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    if (typeof window !== "undefined") {
        await insert(imageData, eventData);
    }

}