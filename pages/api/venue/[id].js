import { db } from "@/lib/firebaseAdminInit";

export default async function handler(req, res) {

    const { id } = req.query;

    try {
        const venue = await db.collection("Venues").doc(id).get();
        res.status(200).json(venue.data());
    } catch (e) {
        console.log(e);
        res.status(400).end();
    }
}