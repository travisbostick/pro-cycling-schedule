import React from 'react';

function AddToCalendar(event) {
  return (
    <div title='Add to Calendar' className='addeventatc' data-styling='none'>
      <img
        src='gfx/icon-calendar-t1.svg'
        alt='Add to Calendar'
        style={{ width: '18px' }}
      />
      <span className='start'>{event.scheduled.toString()}</span>
      <span className='end'>{event.scheduled_end.toString()}</span>
      <span className='title'>{event.description.toString()}</span>
      <span className='all_day_event'>true</span>
    </div>
  );
}

export default AddToCalendar;
