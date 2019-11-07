import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput';
import UserInput from './UserInput/UserInput';

class App extends Component {

  state = {
    username: 'Richard'
  }

  changeUsernameHandler = (newName) => {
    this.setState( {
      username: newName
    });
  }

  dynamicUsernameHandler = (event) => {
    this.setState( {
      username: event.target.value
    });
  }

  render() {
    // inline style
    const inlineStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      cursor: 'pointer'
    }
    return (
      <div className="App">
        <h1>This is the Base Syntax Assignment!</h1>
        <UserInput
          changed={this.dynamicUsernameHandler}
          currentName={this.state.username}
        ></UserInput>
        <button style={inlineStyle} onClick={this.changeUsernameHandler.bind(this, "new username!")}>change username!</button>
        <UserOutput username={this.state.username}></UserOutput>
      </div>
    );
  }

}

export default App;
