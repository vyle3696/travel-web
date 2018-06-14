import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/lib/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* Standard button */}
		  <Button>Default</Button>

		  {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
		  <Button bsStyle="primary">Primary</Button>

		  {/* Indicates a successful or positive action */}
		  <Button bsStyle="success">Success</Button>

		  {/* Contextual button for informational alert messages */}
		  <Button bsStyle="info">Info</Button>

		  {/* Indicates caution should be taken with this action */}
		  <Button bsStyle="warning">Warning</Button>

		  {/* Indicates a dangerous or potentially negative action */}
		  <Button bsStyle="danger">Danger</Button>

		  {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
		  <Button bsStyle="link">Link</Button>
      </div>
    );
  }
}

export default App;
