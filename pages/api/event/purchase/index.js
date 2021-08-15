import { sendEmail } from "@/components/mailService/mailSender";

export default async function handler(req, res) {

    const mailDetails = req.body;

    try {
        sendEmail(mailDetails, "purchase");
        res.status(200).end();
    } catch (e) {
        console.log(e);
        res.status(400).end();
    }
}