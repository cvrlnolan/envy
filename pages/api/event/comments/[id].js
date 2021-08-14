import { db } from '@/firebase/firebaseAdminInit'

export default async function handler(req, res) {

    const { id } = req.query

    try {
        const comments = await db.collection("Events").doc(id).collection("Comments").orderBy("createdDate", "desc").get()
        const commentsData = comments.docs.map(comment => ({
            ...comment.data()
        }))
        res.status(200).json(commentsData)
    } catch (e) {
        console.log(e)
        res.status(400).end()
    }
}