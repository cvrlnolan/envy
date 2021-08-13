import firebase from '@/firebase/firebaseClientInit'

const db = firebase.firestore()
const storage = firebase.storage()
const storageRef = storage.ref()

export default async function InsertVenue(imageData, venueData) {

    const venueRef = db.collection("Venues").doc()

    async function insert(image, venue) {
        try {
            await storageRef.child(`Venues/${venueRef.id}`).put(image).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    venueRef.set({
                        ...venue,
                        venueTelephone: `${venue.phoneExt}${venue.venuePhone}`,
                        venueImgUrl: url,
                        rating: 0,
                        venueId: venueRef.id,
                        createdDate: firebase.firestore.Timestamp.fromDate(new Date())
                    })
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    if (typeof window !== 'undefined') {
        await insert(imageData, venueData)
    }

}