import React from 'react';
import dateFormat from '../date';

function Stage(stage) {
  var date = new Date(stage.scheduled);

  return (
    <div className='col-lg-4 col-6'>
      <div className='card p-2 card-body'>
        <h6 className='card-title'>{stage.description}</h6>
        <p className='card-text'>
          <small className='text-muted'>{dateFormat(date)}</small>
        </p>
      </div>
    </div>
  );
}

export default Stage;
