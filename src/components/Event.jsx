import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Stage from './Stage';
import dateFormat from '../date';
import AddToCalendar from './AddToCalendar';

function Event(event) {
  if (event.scheduled === undefined) {
    return null;
  }

  let endDateString = '';
  if (event.stages.length > 0) {
    dots = '   ';
    for (let i = 0; i < event.stages.length; i++) {
      dots += '·';
    }
    endDateString = ' - ' + dateFormat(event.scheduled_end);
  }

  console.log(event);

  const [open, setOpen] = useState(false);

  return (
    <div className='row'>
      <div className='event card p-1 row col'>
        <button
          className='card-body bg-light text-dark text-decoration-none'
          aria-controls={event.key}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <div>
            <h5 className='card-title'>{event.description}</h5>
            <p className='card-text'>
              <small className='text-muted'>
                {dateFormat(event.scheduled) + endDateString}
              </small>
            </p>
          </div>
        </button>
      </div>
      <div className='float cal col-auto'>
        <div className='p-3'>
          <AddToCalendar {...event} />
        </div>
      </div>
      <Collapse in={open}>
        <div>
          <div className='stages row' id={event.key}>
            {event.stages.map(stage => {
              stage.key = stage.id;
              return <Stage {...stage} />;
            })}
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default Event;
