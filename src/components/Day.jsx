import React from 'react';
import { Grid } from 'semantic-ui-react';
import CalEvent from './CalEvent';
import moment from 'moment';

function Day(day) {
  const today = moment().isSame(moment(day._d).add(1, 'day'), 'date');
  return (
    <Grid.Column className={today && 'today'} style={{ padding: 0 }}>
      <div className={'week' + ' ' + day.weekClass + ' ' + day.dayClass}>
        <p className='pt-1 mb-2'>&nbsp;&nbsp;{day.num}</p>
        {day.events.map((event, i) => {
          if (day.events.length == 1) {
            if (day.shiftedEvents.includes(event)) {
              return [
                <CalEvent
                  hidden={true}
                  event={event}
                  eventNum={i}
                  key={i}
                  day={day}
                />,
                <CalEvent event={event} eventNum={i} key={i} day={day} />
              ];
            } else {
              return <CalEvent event={event} eventNum={i} key={i} day={day} />;
            }
          } else {
            return <CalEvent event={event} eventNum={i} key={i} day={day} />;
          }
        })}
      </div>
    </Grid.Column>
  );
}

export default Day;
