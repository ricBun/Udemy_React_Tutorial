import React from 'react';

const paragraph = (props) => {
  // return <p>My name is {props.name} and i'm {props.age} years old! </p>
  return (
    <p>{props.string} length: {props.length}</p>
  )
};

export default paragraph;
