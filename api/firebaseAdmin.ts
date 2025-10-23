// api/firebaseAdmin.ts
import * as admin from 'firebase-admin';

// Ensure the service account key is correctly formatted
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export { db, admin };
