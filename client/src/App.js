import React, { Component } from "react";
import ImageStorage from './contracts/ImageStorage'

import "./App.css";

class App extends Component {
  state = { storageValue: null, imageStorage: null }

  componentDidMount = async () => {
    const imageStorage = new ImageStorage()
    await imageStorage.init()

    this.setState({ imageStorage }, this.loadImages)
  }

  loadImages = async () => {
    const { imageStorage } = this.state;

    this.setState({ storageValue: await imageStorage.getAll() });
  };

  render() {
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        {/* <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default App;
