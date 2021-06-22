import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Month from './Month';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Header } from 'semantic-ui-react';

function Calendar(props) {
  const [day, setDay] = useState(moment());
  const [month, setMonth] = useState(moment.months(day.month()));
  const [year, setYear] = useState(day.year());

  function prevMonth() {
    setDay(day.subtract(1, 'month'));
    setMonth(moment.months(day.month()));
    setYear(day.year());
  }

  function nextMonth() {
    setDay(day.add(1, 'month'));
    setMonth(moment.months(day.month()));
    setYear(day.year());
  }

  return (
    <div>
      <Header>
        <Container className='pt-4'>
          <Grid columns={3}>
            <Grid.Column>
              <div style={{ textAlign: 'left' }}>
                <button onClick={prevMonth}>prev</button>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={{ textAlign: 'center' }}>
                <p>{month + ' ' + year}</p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={{ textAlign: 'right' }}>
                <button onClick={nextMonth}>next</button>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </Header>
      <Container>
        <Month events={props.events} day={day} setDay={setDay} month={month} />
      </Container>
    </div>
  );
}

export default Calendar;
