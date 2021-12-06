import React, { Component } from "react";
import ipfs from '../utils/ipfsHelper'

const ImageGallery = ({images}) => {
    const list = (images || []).map(it => <li>{it.title}: <Image ipfsPath={it.ipfsPath}/></li>)

    return (<div>{list}</div>)
}

class Image extends Component {
    state = { image: null }

    componentDidMount = async () => {
        const { ipfsPath } = this.props

        this.setState({ image: ipfs.getUrl(ipfsPath)} )
    }

    render() {
        return (<img src={this.state.image} />)
    }
}
  
  export default ImageGallery
