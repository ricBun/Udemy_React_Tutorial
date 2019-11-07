import React from 'react';
import './UserOutput.css'

const useroutput = (props) => {
  // return <p>My name is {props.name} and i'm {props.age} years old! </p>
  return (
    <div className="UserOutput">
      <p>Username: {props.username}</p>
      <p>UserOutput2!</p>
    </div>
  )
};

export default useroutput;
