import React, { Component } from "react"
import ipfs from '../utils/ipfsHelper'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

const ImageGallery = ({images}) => {
    const list = (images || []).map(it => <Image image={it} />)

    return (<Container><Row>{list}</Row></Container>)
}

class Image extends Component {
    state = {
        url: null,
        title: null
    }

    componentDidMount = async () => {
        const { image } = this.props

        this.setState({
            url: ipfs.getUrl(image.ipfsPath),
            title: image.title
        })
    }

    render() {
        return (
            <Card style={{ width: "18rem", margin: "1rem" }}>
                <Card.Img variant="top" src={this.state.url} />
                <Card.Body>
                    <Card.Title>{this.state.title}</Card.Title>
                </Card.Body>
            </Card>
        )
    }
}
  
  export default ImageGallery
