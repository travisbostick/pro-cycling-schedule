import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import data from '../events.json';

function Calendar(props) {
  const [menFilter, setMenFilter] = useState(true);
  const [womenFilter, setWomenFilter] = useState(false);
  const [events, setEvents] = useState(
    data.filter(
      event => event.class.includes('UWT') || event.class.includes('CM')
    )
  );
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
    hoverDetails ||
      setEventDetails({
        x: info.jsEvent.clientX - 10,
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
        website: info.event._def.extendedProps.website
      });
  }

  function leaveEvent(info) {
    setHoverEvent(false);
  }

  function enterDetails() {
    setHoverDetails(true);
  }

  function leaveDetails() {
    setHoverDetails(false);
  }

  function filter(menFilter, womenFilter) {
    setEvents(
      data.filter(event => {
        return (
          (menFilter &&
            (event.class.includes('UWT') || event.class.includes('CM'))) ||
          (womenFilter &&
            (event.class.includes('WWT') || event.class.includes('CM')))
        );
      })
    );
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
    let womenFilterButton = document.querySelector('.fc-men-button');
    menFilter && menFilterButton.classList.add('fc-button-active');
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
        eventMouseLeave={leaveEvent}
        customButtons={filters}
      />
      <div
        className='hoverMenu'
        style={{
          display: hoverEvent || hoverDetails || 'none',
          top: `${eventDetails.y}px`,
          left: `${eventDetails.x}px`
        }}
        onMouseEnter={enterDetails}
        onMouseLeave={leaveDetails}
      >
        <p>{eventDetails.title}</p>
        <p>
          {eventDetails.start} - {eventDetails.end}
        </p>
        <p>{eventDetails.class}</p>
        {eventDetails.website !== '' && (
          <a href={'//' + eventDetails.website} target='_blank'>
            {eventDetails.website}
          </a>
        )}
      </div>
    </div>
  );
}

export default Calendar;
