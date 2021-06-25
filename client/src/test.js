import axios from 'axios';
import moment from 'moment-timezone';

let event = null;

await axios
  .get('http://localhost:3001/getEvents')
  .then(res => {
    // console.log(res.data);
    event = res.data[0];
  })
  .catch(err => {
    console.log(err);
    console.log('error');
  });

console.log(new Date(event.scheduled));

let start = moment.tz(event.scheduled, 'utc');

console.log(start);
