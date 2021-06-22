import React, { useEffect } from 'react';
import moment from 'moment-timezone';

function CalEvent(props) {
  let start = moment(props.event.scheduled);
  let end = moment(props.event.scheduled_end);
  let day = moment(props.day);

  useEffect(() => {});

  function oneDayClass() {
    return isOneDay() ? 'oneDay ' : ' ';
  }

  function startDayClass() {
    return isStart() ? 'startDay ' : ' ';
  }

  function endDayClass() {
    return isEnd() ? 'endDay ' : ' ';
  }

  function middleDayClass() {
    return isMiddle() ? 'middleDay ' : ' ';
  }

  function isMiddle() {
    return !isOneDay() && !isStart() && !isEnd();
  }

  function newLineEventClass() {
    return isNewLine() ? 'newLineEvent ' : ' ';
  }

  function hiddenDayClass() {
    return props.hidden && 'hiddenDay';
  }

  function isOneDay() {
    return props.event.single_event;
    // return start.isSame(end, 'day');
  }

  function isStart() {
    return !isOneDay() && day.isSame(start, 'day');
  }

  function isEnd() {
    return !isOneDay() && day.isSame(end, 'day');
  }

  function isNewLine() {
    return !isOneDay() && day.day() === 0;
  }

  return (
    <div>
      <button
        className={
          'calEvent ' +
          oneDayClass() +
          startDayClass() +
          newLineEventClass() +
          endDayClass() +
          middleDayClass() +
          hiddenDayClass()
        }
        // styles={props.hidden && { visibility: 'hidden' }}
      >
      <span className='eventText'>
        {props.event.description}
      </span>
      </button>
    </div>
  );
}

export default CalEvent;
