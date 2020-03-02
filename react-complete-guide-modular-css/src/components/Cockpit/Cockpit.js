import React, {useEffect, useRef} from 'react';

import classes from './Cockpit.css';

const Cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const assignedClasses = [];
  let btnClass ='';

  if(props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  useEffect(() => {
    toggleBtnRef.current.click();
  }, []);

  return (
    <div className={classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
          className={btnClass} 
          onClick={props.clicked}
          ref={toggleBtnRef}
          >
          Toggle Persons
        </button>
        <button onClick={props.login}>Log In</button>
    </div>
  );
};

export default Cockpit;