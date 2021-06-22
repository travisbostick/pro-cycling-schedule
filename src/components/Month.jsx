import React from 'react';
import Week from './Week';
import { Grid, GridColumn } from 'semantic-ui-react';
import moment from 'moment-timezone';

function Month(props) {
  let days = [];
  let day = moment.utc(props.day);
  let start = moment.utc(day.startOf('month'));
  let first = moment.utc(start.subtract(start.day(), 'days'));
  days.push(moment.utc(first));
  for (let i = 0; i < 41; i++) {
    days.push(moment.utc(first.add(1, 'day')));
  }
  let weeks = [...Array(days.length / 7)].map(_ => days.splice(0, 7));

  let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Grid columns={7} divided>
      <Grid.Row>
        {weekDays.map((weekDay, i) => (
          <GridColumn key={i}>
            <p>{weekDay}</p>
          </GridColumn>
        ))}
      </Grid.Row>
      {weeks.map((week, i) => (
        <Week
          key={i}
          num={i}
          events={props.events
            .filter(event => {
              return (
                week[0].isSameOrBefore(event.scheduled_end, 'day') &&
                week[6].isSameOrAfter(event.scheduled, 'day')
              );
            })
            .map((event, i) => {
              return { ...event, order: i };
            })}
          {...[week]}
        />
      ))}
    </Grid>
  );
}

export default Month;
