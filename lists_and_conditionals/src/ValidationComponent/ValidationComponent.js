import React from 'react';

const validationComponent = (props) => {

  let component = null;
  if (props.length >= 5) {
    component =
     <p>Text long enough!</p>

  }
  else {
    component =
      <p>Text too short</p>
  }

  return (
    <div>
      {component}
    </div>
  )
}

export default validationComponent;
