import React, { Component } from "react"

import Form from 'react-bootstrap/Form'

class ImageUploader extends Component {
    onChange = async (e) => {
      const [file] = e.target.files
      this.props.storeImage(file)
    }
  
    render() {
        return(
            <Form.Group style={{ margin: "1rem" }} controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={(e) => this.onChange(e)} />
            </Form.Group>
        )
    }
}

export default ImageUploader
