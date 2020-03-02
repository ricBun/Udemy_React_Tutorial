import React, { Component } from 'react';
import './App.css';
import Paragraph from './Paragraph/Paragraph';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    inputString: "firstString",
    length: "firstString".length
  }

  dynamicUsernameHandler = (event) => {
    this.setState({
      inputString: event.target.value,
    });
  }

  deleteCharHandler = (charIndex) => {
    const text = this.state.inputString.split('');
    // remove element from array
    text.splice(charIndex, 1);
    // recreate new string from array
    const updatedText = text.join('');
    this.setState({inputString: updatedText});
  }

  render(){
    return (<div>
      <h1>Assignment 2 - List and Conditionals</h1>
      <input
        type="text"
        onChange={this.dynamicUsernameHandler}
        value={this.state.inputString}
      />

      <Paragraph
        length={this.state.inputString.length}
        string={this.state.inputString}
      ></Paragraph>

      <ValidationComponent
        length={this.state.length}
      ></ValidationComponent>

      {
        // JavaScript mapping each character
        this.state.inputString.split('').map((character, index) => {
          return <CharComponent
            character={character}
            clickFunction={() => this.deleteCharHandler(index)}
            ></CharComponent>
        })
      }

    </div>
    );
  }

}

export default App;
