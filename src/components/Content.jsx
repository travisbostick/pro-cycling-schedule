import React, { useState, useEffect } from 'react';
import Event from './Event';
import axios from 'axios';

function Content() {
  const [events, setEvents] = useState([]);
  const [stages, setStages] = useState([]);

  useEffect(async () => {
    await axios
      .get('http://localhost:3001/getEvents')
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(async () => {
    await axios
      .get('http://localhost:3001/getStages')
      .then(res => {
        setStages(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container-fluid'>
      {events.map((event, i) => {
        event.key = event.id;
        event.scheduled = new Date(event.scheduled);
        event.stages = stages.filter(stage => stage.event_id === event.id);
        return <Event {...event} />;
      })}
    </div>
  );
}

export default Content;
