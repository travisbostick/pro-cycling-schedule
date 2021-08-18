import React from 'react';
import 'semantic-ui-css/semantic.min.css';

function Stripes() {
  return (
    <div>
      <div className='stripe'></div>
      <div className='stripe blue-stripe'></div>
      <div className='stripe red-stripe'></div>
      <div className='stripe black-stripe'></div>
      <div className='stripe yellow-stripe'></div>
      <div className='stripe green-stripe'></div>
      <div className='stripe'></div>
    </div>
  );
}

export default Stripes;
