import React from "react";
import ImageUploader from "react-images-upload";

import "./imageUploader.less";

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
  }

  render() {
    return (
      <div style={{ margin: "2px" }}>
        <ImageUploader
          withIcon={false}
          withPreview={true}
          singleImage={true}
          label=""
          buttonText="Upload Images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png"]}
          fileSizeError=" file size is too big"
        />
      </div>
    );
  }
}