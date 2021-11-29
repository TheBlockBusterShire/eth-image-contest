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
    const { imageStorage } = this.state

    this.setState({ storageValue: await imageStorage.getAll() })
  }

  addImage = async () => {
    const { imageStorage } = this.state
    await imageStorage.setImage()

    this.setState({ storageValue: await imageStorage.getAll() })
  }

  render() {
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p onClick={() => this.addImage()}>
          Click to add sample image to storage
        </p>
        <div>Number of stored images: {(this.state.storageValue || []).length}</div>
      </div>
    );
  }
}

export default App;
