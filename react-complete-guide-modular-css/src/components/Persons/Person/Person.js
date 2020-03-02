import React, {useRef, useEffect} from 'react';

import Aux from '../../../hoc/Aux';
import classes from './Person.css';

const person = props => {
  const inputElementRef = useRef(null);

  useEffect(() => {
    inputElementRef.current.focus();
  });

  return (
    <Aux>
    <div className={classes.Person}>
    {props.isAuth ? <p>Authenticated!</p> : <p>Please Login!</p>}
      <p onClick={props.click}>
        I'm {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
      <input 
        type="text" 
        onChange={props.changed} 
        value={props.name}
        ref={inputElementRef}
      />
    </div>
    </Aux>
  );
};

export default person;
