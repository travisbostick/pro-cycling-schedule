// Firestore
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const moment = require('moment');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// API
require('dotenv').config();
const https = require('https');
const apiURL = 'https://api.sportradar.us/cycling/trial/v2/en/';
const apiKey = '?api_key=' + process.env.SPORTSRADAR_API_KEY;

const desiredSeasons = [
  // 'Cycling Men 2020',
  // 'Cycling Women 2020',
  'Cycling Men 2021'
];

addSeasons();

// addSchedule('sr:stage:635575');

function addSeasons() {
  let seasonsURL = apiURL + 'seasons.json' + apiKey;
  console.log(seasonsURL);
  https.get(seasonsURL, function (res) {
    let data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', () => {
      let seasonsData = JSON.parse(data);
      let seasons = seasonsData.stages;
      seasons.forEach(season => {
        if (desiredSeasons.includes(season.description)) {
          console.log(season);
          addSchedule(season.id)
          // addData(season);
        }
      });
    });
  });
}

async function addSchedule(id) {
  console.log(id);
  let season = await findSeason(id);
  season.type = 'season';
  season.id = id;
  let scheduleURL = apiURL + 'sport_events/' + id + '/schedule.json' + apiKey;
  console.log(scheduleURL);
  https.get(scheduleURL, function (res) {
    let data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', () => {
      let scheduleData = JSON.parse(data);
      console.log(scheduleData);
      scheduleData.stages.forEach(item => {
        // processData(item, season);
      });
    });
  });
}

function processData(child, parent) {
  if (child.stages) {
    child.stages.forEach(item => {
      processData(item, child);
    });
    delete child.stages;
    let property = parent.type + '_id';
    child[property] = parent.id;
  } else {
    let property = parent.type + '_id';
    child[property] = parent.id;
  }
  addData(child);
}

async function findSeason(id) {
  const seasonRef = db.collection('seasons').doc(id);
  const season = await seasonRef.get();
  return season.data();
}

async function addData(data) {
  console.log(data);
  data.scheduled = moment.utc(data.scheduled);
  data.scheduled_end = moment.utc(data.scheduled_end);
  const docRef = db.collection(data.type + 's').doc(data.id);
  delete data.id;
  delete data.type;
  await docRef.set(data);
}
