import React, { Component } from "react"
import ipfs from '../utils/ipfsHelper'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const ImageGallery = ({images, addVote}) => {
    const list = (images || []).map(it => <Image image={it} addVote={addVote}/>)

    return (<Container><Row>{list}</Row></Container>)
}

class Image extends Component {
    state = {
        id: null,
        url: null,
        title: null,
        votesNumber: 0
    }

    componentDidMount = async () => {
        const { image } = this.props

        this.setState({
            id: image.id,
            url: ipfs.getUrl(image.ipfsPath),
            title: image.title,
            votesNumber: image.votesNumber
        })
    }

    onVoteClick = async () => {
        const { id } = this.state

        this.props.addVote(id)
    }

    render() {
        return (
            <Card style={{ width: "18rem", margin: "1rem" }}>
                <Card.Img variant="top" src={this.state.url} />
                <Card.Body>
                    <Card.Title>{this.state.title}</Card.Title>
                    <Card.Text>{this.state.votesNumber}</Card.Text>
                    <Button onClick={() => this.onVoteClick()}>Vote</Button>
                </Card.Body>
            </Card>
        )
    }
}
  
  export default ImageGallery
