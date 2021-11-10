import { db } from "@/lib/firebaseAdminInit";

export default async function handler(req, res) {

    const { id } = req.query;

    try {
        const event = await db.collection("Events").doc(id).get();
        res.status(200).json(event.data());
    } catch (e) {
        console.log(e);
        res.status(400).end();
    }
}