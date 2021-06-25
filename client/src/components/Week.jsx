import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import moment from 'moment-timezone';
import Day from './Day';

function Week(week) {
  useEffect(() => {
    console.log(week);
  }, [week.events]);

  let shiftedEvents = [];

  return (
    <Grid.Row style={{ padding: 0 }}>
      {week[0].map((day, i) => {
        let events = week.events.filter(event => {
          day = moment.utc(day);
          return (
            day.isSameOrAfter(event.scheduled, 'day') &&
            day.isSameOrBefore(event.scheduled_end, 'day')
          );
        });
        if (events.length > 1) {
          for (let i = 1; i < events.length + 1; i++) {
            shiftedEvents.push(events[i]);
          }
        }
        return (
          <Day
            weekClass={'week' + week.num}
            dayClass={'day' + i}
            events={events}
            shiftedEvents={shiftedEvents}
            key={i}
            num={day.date()}
            {...day}
          />
        );
      })}
    </Grid.Row>
  );
}

export default Week;
