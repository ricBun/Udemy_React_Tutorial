import React from 'react'

// this component used to be used as a wrapper for the App.js
// instead of returning a DIV
const withClass = props => (
  <div className={props.classes}>
    {props.children}
  </div>
);

export default withClass;
