import React, { Component } from "react";
import ImageStorage from './contracts/ImageStorage'
import { uploadToIpfs } from './utils/ipfsUploader'

import "./App.css";

class App extends Component {
  state = {
    storageValue: null,
    images: null
  }

  componentDidMount = async () => {
    const imageStorage = new ImageStorage()
    await imageStorage.init()

    this.setState({ imageStorage }, this.reloadImages)
  }

  uploadImage = async (e) => {
    const { imageStorage } = this.state
    const [file] = e.target.files

    const ipfsPath = await uploadToIpfs(file)
    await imageStorage.setImage(ipfsPath, file.name)

    this.reloadImages()
  }

  reloadImages = async () => {
    const { imageStorage } = this.state

    this.setState({ images: await imageStorage.getAll() })
    console.log(this.state.images)
  }

  render() {
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>

        <input multiple type="file" onChange={(e) => this.uploadImage(e)} />
        <ImageGallery images={this.state.images}/>
      </div>
    );
  }
}

const ImageGallery = ({images}) => {
  const list = (images || []).map(it => <li>{it.title}: {it.imagehash}</li>)

  return (<div>{list}</div>)
}

export default App;
