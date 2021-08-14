import { db } from '@/firebase/firebaseAdminInit'

export default async function handler(req, res) {

    const { id } = req.query

    try {
        const reviews = await db.collection("Venues").doc(id).collection("Reviews").orderBy("createdDate", "desc").get()
        const reviewsData = reviews.docs.map(review => ({
            ...review.data()
        }))
        res.status(200).json(reviewsData)
    } catch (e) {
        console.log(e)
        res.status(400).end()
    }
}