import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import serviceAccount from './serviceAccountKey.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());

const router = express.Router();
app.use('/', router);

var db = admin.firestore();

app.listen(3001, () => {
  console.log('Server started on port 3001');
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
