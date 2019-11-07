import React from 'react';
import './UserInput.css'

const userinput = (props) => {
  // return <p>My name is {props.name} and i'm {props.age} years old! </p>
  return (
    <div className="UserInput">
      <input type="text" onChange={props.changed} value={props.currentName}/>
    </div>
  )
};

export default userinput;
