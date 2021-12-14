import React, { Component } from "react";
import ImageStorage from '../contracts/ImageStorage'
import VoteStorage from "../contracts/VoteStorage"
import ipfs from '../utils/ipfsHelper'

import getWeb3 from "../utils/getWeb3";
import ImageGallery from "./ImageGallery";
import ImageUploader from "./ImageUploader";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class App extends Component {
  state = {
    imageStorage: null,
    VoteStorage: null,
    images: null
  }

  componentDidMount = async () => {
    const web3 = await getWeb3()
    const imageStorage = new ImageStorage()
    await imageStorage.init(web3)

    const voteStorage = new VoteStorage()
    await voteStorage.init(web3)

    const isOwner = await imageStorage.isOwner()

    this.setState({ imageStorage, voteStorage, isOwner }, this.reloadState)
  }

  storeImage = async (file) => {
    const { imageStorage } = this.state

    const ipfsPath = await ipfs.upload(file)
    await imageStorage.setImage(ipfsPath, file.name)

    this.reloadState()
  }

  reloadState = async () => {
    const { imageStorage, voteStorage } = this.state

    const rawImages = await imageStorage.getAll()
    const votingSummary = await voteStorage.getSummary()
    const winners = await voteStorage.getWinners()

    const images = rawImages.map(raw => {
      return {
        ...raw,
        voteCount: (votingSummary.find(it => it.imageId === raw.id) || {}).voteCount,
        isWinner: winners.includes(raw.id)
      }
    })
    this.setState({ images: [] })
    this.setState({ images })
  }

  addVote = async (imageId) => {
    const { voteStorage } = this.state

    await voteStorage.setVote(imageId)

    this.reloadState()
  }

  render() {
    return (
      <div className="App">
        <ImageUploader storeImage={this.storeImage} />
        <ImageGallery
          images={this.state.images}
          addVote={this.addVote}
          isOwner={this.state.isOwner}
        />
      </div>
    );
  }
}

export default App;
