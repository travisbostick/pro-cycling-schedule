import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Month from './Month';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Header } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button';

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
        <div className='stripe blue-stripe'></div>
        <div className='stripe red-stripe'></div>
        <div className='stripe black-stripe'></div>
        <div className='stripe yellow-stripe'></div>
        <div className='stripe green-stripe'></div>
        <Container className='pt-4'>
          <Grid columns={3}>
            <Grid.Column>
              <div style={{ textAlign: 'left' }}>
                <Button
                  variant='light'
                  onClick={prevMonth}
                  className='month-nav'
                >
                  &lt;
                </Button>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={{ textAlign: 'center' }} className='month-name'>
                <p>{month + ' ' + year}</p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={{ textAlign: 'right' }}>
                <Button
                  variant='light'
                  onClick={nextMonth}
                  className='month-nav'
                >
                  &gt;
                </Button>
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
