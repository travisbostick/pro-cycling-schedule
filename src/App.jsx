import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
// import Content from './components/Content';
import Event from './components/Event';
import Calendar from './components/Calendar';
import moment from 'moment-timezone';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    await axios
      .get('./getEvents')
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className=''>
      <Header />
      <Event />
      <div className=''>
        {/* <Content /> */}
        <Calendar events={events} />
      </div>
      <footer className='d-flex container justify-content-center text-muted mt-4 mb-4'>
        <p>Created by Travis Bostick</p>
      </footer>
    </div>
  );
}

export default App;
