import { db } from "@/firebase/firebaseAdminInit";

//Use Admin SDK in case you strap your Firestore with Security Rules.

export default async function handler(req, res) {
    try {
        const venues = await db.collection("Venues").orderBy("rating", "desc").get();
        const venuesData = venues.docs.map((venue) => ({
            ...venue.data()
        }))
        res.status(200).json(venuesData)
    } catch (e) {
        res.status(400).end()
    }
}