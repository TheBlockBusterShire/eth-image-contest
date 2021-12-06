import React, { Component } from "react";
import ImageStorage from '../contracts/ImageStorage'
import ipfs from '../utils/ipfsHelper'

import ImageGallery from "./ImageGallery";
import ImageUploader from "./ImageUploader";

import "./App.css";

class App extends Component {
  state = {
    imageStorage: null,
    images: null
  }

  componentDidMount = async () => {
    const imageStorage = new ImageStorage()
    await imageStorage.init()

    this.setState({ imageStorage }, this.reloadImages)
  }

  storeImage = async (file) => {
    const { imageStorage } = this.state

    const ipfsPath = await ipfs.upload(file)
    await imageStorage.setImage(ipfsPath, file.name)

    this.reloadImages()
  }

  reloadImages = async () => {
    const { imageStorage } = this.state

    this.setState({ images: await imageStorage.getAll() })
  }

  render() {
    return (
      <div className="App">
        <ImageUploader storeImage={this.storeImage} />
        <ImageGallery images={this.state.images}/>
      </div>
    );
  }
}

export default App;
