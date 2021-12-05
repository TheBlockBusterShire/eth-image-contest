import React, { Component } from "react";

class ImageUploader extends Component {
    onChange = async (e) => {
      const [file] = e.target.files
      this.props.storeImage(file)
    }
  
    render() {
      return (<input multiple type="file" onChange={(e) => this.onChange(e)} />)
    }
}

export default ImageUploader
