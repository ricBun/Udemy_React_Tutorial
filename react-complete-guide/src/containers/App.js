import React, { Component } from 'react';
import styled from 'styled-components';

import './App.css';
import Persons from '../components/Persons/Persons';
// import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

// in component way of styling button
const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red': 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
  background-color: ${props => props.alt ? 'salmon': 'lightgreen'};
    color: black;
  }
`;
class App extends Component {
  state = {
      persons: [
          {id: "1", name: "Richard", age: 34},
          {id: "2", name: "Victoria", age: 75},
          {id: "3", name: "Bianca", age: 1232}
      ],
      showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState( {
      persons: [
          {name: newName, age: 67},
          {name: "VictoriaNEW!", age: 75},
          {name: "BiancaNEW", age: 127}
      ]
    });
  }

  deletePersonHandler = (personIndex) => {
    // const newPersons = this.state.persons.slice();
    const newPersons = [...this.state.persons];
    // remove element from array
    newPersons.splice(personIndex, 1);
    this.setState({persons: newPersons});
  }

  nameChangedHandler = (event, id) => {
    // find person in the array.
    // if the id's match, return true
    // this in turn, returns the index if true
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const updatedPerson = {
      ...this.state.persons[personIndex]
    };

    //update the person
    updatedPerson.name = event.target.value;
    const newPersons = [...this.state.persons];
    newPersons[personIndex] = updatedPerson;
    this.setState({persons: newPersons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    // toggle
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
        </div>
      );

      // change the background colour if showPersons has been clicked
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
        <div className="App">
          <h1> Hi, I'm a react app!</h1>
        <p className={classes.join(' ')}> This works! </p>
          <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>Toggle Persons</StyledButton>
          {persons}
        </div>
    );
    // bottom code does the same thing!
    // transpiler converts above JSX code into bottom code
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, THIS IS REACT BITCH'));
  }
}

export default App;
