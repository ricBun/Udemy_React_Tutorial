import React, { Component } from 'react';
import styled from 'styled-components';

import './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
        {
        // instead of created each person individually
        // use ES6 map function
        // maps the elements in the persons arrays into JSX Person object
        }
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            </ErrorBoundary>
          })}
        {
          // <Person
          //     name={this.state.persons[0].name}
          //     age={this.state.persons[0].age}
          //     > My hobbies: Suceeding
          //   </Person>
          //   <Person
          //     name={this.state.persons[1].name}
          //     age={this.state.persons[1].age}
          //     click={this.switchNameHandler.bind(this, 'pClicked')}
          //     changed={this.nameChangedHandler}
          //   />
          //   <Person
          //     name={this.state.persons[2].name}
          //     age={this.state.persons[2].age}/>
        }
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
