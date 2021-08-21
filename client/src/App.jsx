import React from 'react';
import Calendar from './components/Calendar';
import Stripes from './components/Stripes';

function App() {
  return (
    <div>
      <div>
        <Stripes />
        <Calendar />
      </div>
      <footer className='d-flex container justify-content-center text-muted mb-4'>
        <p>Created by Travis Bostick</p>
      </footer>
    </div>
  );
}

export default App;
