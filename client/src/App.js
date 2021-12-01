import React, { Component } from "react";
import ImageStorage from './contracts/ImageStorage'
import { uploadToIpfs } from './utils/ipfsUploader'

import "./App.css";

class App extends Component {
  state = { storageValue: null, imageStorage: null }

  componentDidMount = async () => {
    const imageStorage = new ImageStorage()
    await imageStorage.init()

    this.setState({ imageStorage }, this.loadImages)
  }

  // ImageUploader
  onFileChange = async (e) => {
    const [file] = e.target.files

    const ipfsPath = await uploadToIpfs(file)
    this.addImage(ipfsPath, file.name)
  }

  addImage = async (ipfsPath, filename) => {
    const { imageStorage } = this.state
    await imageStorage.setImage(ipfsPath, filename)

    this.setState({ storageValue: await imageStorage.getAll() })
  }
  // ----------------------------

  loadImages = async () => {
    const { imageStorage } = this.state

    this.setState({ storageValue: await imageStorage.getAll() })
  }

  render() {
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>

        <input multiple type="file" onChange={(e) => this.onFileChange(e)} />
        <ImageList images={this.state.storageValue}/>
      </div>
    );
  }
}

const ImageList = ({images}) => {
  const list = (images || []).map(it => <li>{it.name}: {it.imagehash}</li>)

  return (
    <div>{list}</div>
  )
}

export default App;
