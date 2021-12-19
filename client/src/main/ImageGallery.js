import React, { Component } from "react"
import ipfs from '../utils/ipfsHelper'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const ImageGallery = ({images, addVote, mintNft, isOwner}) => {
    const list = (images || []).map(it => <Image image={it} addVote={addVote} mintNft={mintNft} isOwner/>)

    return (<Container><Row>{list}</Row></Container>)
}

class Image extends Component {
    state = {
        id: null,
        url: null,
        title: null,
        voteCount: 0,
        canMint: false
    }

    componentDidMount = async () => {
        const { isOwner, image } = this.props

        this.setState({
            id: image.id,
            url: ipfs.getUrl(image.ipfsPath),
            title: image.title,
            voteCount: image.voteCount,
            canMint: image.isWinner && isOwner
        })
    }

    onVoteClick = async () => {
        const { id } = this.state

        this.props.addVote(id)
    }

    onMintClick = async () => {
        const { url } = this.state

        this.props.mintNft(url)
    }

    render() {
        return (
            <Card style={{ width: "18rem", margin: "1rem" }}>
                <Card.Img variant="top" src={this.state.url} />
                <Card.Body>
                    <Card.Title>{this.state.title}</Card.Title>
                    <Card.Text>{this.state.voteCount}</Card.Text>
                    <Button onClick={() => this.onVoteClick()}>Vote</Button>
                    <br/>
                    <br/>
                    {this.state.canMint &&
                    <Button onClick={() => this.onMintClick()} variant="success">Mint</Button>
                    }
                </Card.Body>
            </Card>
        )
    }
}
  
  export default ImageGallery
