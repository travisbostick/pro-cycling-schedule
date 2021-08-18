import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stripes from './components/Stripes';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function App() {
  const [events, setEvents] = useState([]);

  const colors = ['#337cc4', '#7c36b5', '#2e8743', '#ba3729'];

  useEffect(async () => {
    await axios
      .get('./getEvents')
      .then(res => {
        // setEvents(res.data);
        setEvents(
          res.data.map((event, i) => {
            return {
              title: event.description,
              start: event.scheduled,
              end: event.scheduled_end,
              allDay: true,
              color: colors[i % 4]
            };
          })
        );
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <Stripes />
        <div className='container calendar'>
          <FullCalendar
            plugins={[dayGridPlugin]}
            // headerToolbar={{
            //   center: 'title',
            //   right: 'prev,next today'
            // }}
            height='55rem'
            initialView='dayGridMonth'
            events={events}
          />
        </div>
      </div>
      <footer className='d-flex container justify-content-center text-muted mb-4'>
        <p>Created by Travis Bostick</p>
      </footer>
    </div>
  );
}

export default App;
