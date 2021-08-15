import admin from "firebase-admin";

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
            }),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
        });
    } catch (error) {
        console.log("Firebase admin initialization error", error.stack);
    }

    console.log("Firebase Admin successfuly init.")
}

const auth = admin.auth();

const db = admin.firestore();

export { auth, db, admin };