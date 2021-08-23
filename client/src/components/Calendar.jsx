import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import menEvents from '../data/menEvents.json';
import womenEvents from '../data/womenEvents.json';
import neutralEvents from '../data/neutralEvents.json';

function Calendar(props) {
  const [menFilter, setMenFilter] = useState(true);
  const [womenFilter, setWomenFilter] = useState(true);
  const [events, setEvents] = useState([
    ...menEvents,
    ...womenEvents,
    ...neutralEvents
  ]);
  const [hoverEvent, setHoverEvent] = useState(false);
  const [hoverDetails, setHoverDetails] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const options = {
    weekDay: 'long',
    month: 'short',
    day: 'numeric'
  };

  function click(info) {
    console.log(info);
  }

  function enterEvent(info) {
    setHoverEvent(true);
    let maxX = window.innerWidth - 210;
    hoverDetails ||
      setEventDetails({
        x: Math.min(info.jsEvent.clientX - 10, maxX),
        y: info.jsEvent.clientY - (info.jsEvent.offsetY - 22),
        title: info.event._def.title,
        start: info.event._instance.range.start.toLocaleDateString(
          'en-US',
          options
        ),
        end: info.event._instance.range.end.toLocaleDateString(
          'en-US',
          options
        ),
        class: info.event._def.extendedProps.class,
        website: info.event._def.extendedProps.website,
        singleDay: info.event._def.extendedProps.singleDay
      });
  }
  function filter(menFilter, womenFilter) {
    let allEvents = [];
    menFilter && allEvents.push(...menEvents);
    womenFilter && allEvents.push(...womenEvents);
    (menFilter || womenFilter) && allEvents.push(...neutralEvents);
    setEvents(allEvents);
  }

  const filters = {
    men: {
      text: 'Men',
      click: () => {
        let menFilterButton = document.querySelector('.fc-men-button');
        menFilter
          ? menFilterButton.classList.remove('fc-button-active')
          : menFilterButton.classList.add('fc-button-active');
        filter(!menFilter, womenFilter);
        setMenFilter(!menFilter);
      }
    },
    women: {
      text: 'Women',
      click: () => {
        let womenFilterButton = document.querySelector('.fc-women-button');
        womenFilter
          ? womenFilterButton.classList.remove('fc-button-active')
          : womenFilterButton.classList.add('fc-button-active');
        filter(menFilter, !womenFilter);
        setWomenFilter(!womenFilter);
      }
    }
  };

  useEffect(() => {
    let menFilterButton = document.querySelector('.fc-men-button');
    let womenFilterButton = document.querySelector('.fc-women-button');
    menFilter && menFilterButton.classList.add('fc-button-active');
    womenFilter && womenFilterButton.classList.add('fc-button-active');
  }, []);

  return (
    <div className='container calendar'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          left: 'men,women',
          center: 'title',
          right: 'prev,next today'
        }}
        // height='55rem'
        height='auto'
        initialView='dayGridMonth'
        events={events}
        eventClick={click}
        eventMouseEnter={enterEvent}
        eventMouseLeave={() => setHoverEvent(false)}
        customButtons={filters}
      />
      <div
        className='hoverMenu card'
        style={{
          display: hoverEvent || hoverDetails || 'none',
          top: `${eventDetails.y}px`,
          left: `${eventDetails.x}px`
        }}
        onMouseEnter={() => setHoverDetails(true)}
        onMouseLeave={() => setHoverDetails(false)}
      >
        <div className='card-body'>
          <h5 className='card-title'>{eventDetails.title}</h5>
          <div className='card-text'>
            {eventDetails.singleDay && <p>{eventDetails.end}</p>}
            {eventDetails.singleDay || (
              <p>
                {eventDetails.start} - {eventDetails.end}
              </p>
            )}
            <p>{eventDetails.class}</p>
          </div>
          {eventDetails.website !== '' && (
            <a
              href={'//' + eventDetails.website}
              className='card-link'
              target='_blank'
            >
              {eventDetails.website}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
