import express from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const serviceAccount = {
  type: 'service_account',
  project_id: 'pro-cycling-schedule',
  private_key_id: process.env.FIRESTORE_PRIVATE_KEY_ID,
  private_key: process.env.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIRESTORE_CLIENT_EMAIL,
  client_id: process.env.FIRESTORE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uilw4%40pro-cycling-schedule.iam.gserviceaccount.com'
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

router.route('/getEvents').get(async (_, res) => {
  try {
    const snapshot = await db.collection('events').get();
    let data = [];
    snapshot.forEach((doc, i) => {
      data.push({
        ...doc.data(),
        id: doc.id
      });
    });
    let newData = [];
    data.forEach(doc => {
      doc.scheduled = doc.scheduled.toDate();
      doc.scheduled_end = doc.scheduled_end.toDate();
      newData.push(doc);
    });
    newData.sort((a, b) => {
      return new Date(a.scheduled) - new Date(b.scheduled);
    });
    // let newNewData = newData.filter(event => {
    //   return event.scheduled_end >= new Date();
    // });
    res.send(newData);
    // console.log(newData);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.route('/getStages').get(async (_, res) => {
  try {
    const snapshot = await db.collection('stages').get();
    let data = [];
    snapshot.forEach((doc, i) => {
      data.push({
        ...doc.data(),
        id: doc.id
      });
    });
    let newData = [];
    data.forEach(doc => {
      doc.scheduled = doc.scheduled.toDate();
      doc.scheduled_end = doc.scheduled_end.toDate();
      newData.push(doc);
    });
    newData.sort((a, b) => {
      return new Date(a.scheduled) - new Date(b.scheduled);
    });
    res.send(newData);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// router.route('/getSeasons').get(async (_, res) => {
//   try {
//     const snapshot = await db.collection('seasons').get();
//     let data = [];
//     snapshot.forEach((doc, i) => {
//       data.push({
//         ...doc.data(),
//         id: doc.id
//       });
//     });
//     let newData = [];
//     data.forEach(doc => {
//       doc.scheduled = doc.scheduled.toDate();
//       doc.scheduled_end = doc.scheduled_end.toDate();
//       newData.push(doc);
//     });
//     newData.sort((a, b) => {
//       return new Date(a.scheduled) - new Date(b.scheduled);
//     });
//     res.send(newData);
//     console.log(newData);
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });

// app.get('/Men', (req, res) => {
//   try {
//     const snapshot = await db.collection('seasons').get();
//     let data = [];
//   } catch (err) {

//   }
// });

export default router;
