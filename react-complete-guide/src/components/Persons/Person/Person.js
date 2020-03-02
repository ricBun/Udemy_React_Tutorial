import React from 'react';
import styled from 'styled-components';
import './Person.modules.css';


// DIFFERENT WAY OF STYLING WITHIN THE COMPONENT
// const StyledDiv = styled.div`
//   width: 60%;
//   margin: 16px auto;
//   border: 1px solid #eee;
//   box-shadow: 0  2px 3px #ccc;
//   padding: 16px;
//   text-align: center;

//   @media(min-width: 500px) {
//     width: 200px;
//   }
// `;

const person = (props) => {
  return (

    <div className="Person">
    {/* <StyledDiv> */}
      <p onClick={props.click}>My name is {props.name} and i'm {props.age} years old! </p>
      <p> {props.children} </p> 
      <input type="text" onChange={props.changed} value={props.name}/>
     {/* </StyledDiv> */}
    </div>
  )
};

export default person;
