import { db, admin } from '@/firebase/firebaseAdminInit'

//Use Admin SDK in case you strap your Firestore with Security Rules.

export default async function handler(req, res) {
    try {
        const events = await db.collection("Events").where("formattedEndDate", ">=", admin.firestore.Timestamp.fromDate(new Date())).get()
        const eventsData = events.docs.map(event => ({
            ...event.data()
        }))
        res.status(200).json(eventsData)
    } catch (e) {
        console.log(e)
        res.status(400).end()
    }
}