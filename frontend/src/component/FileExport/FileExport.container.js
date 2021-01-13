import { PureComponent } from 'react';
import FileExport from './FileExport.component';
import { postImage, postVideo } from '../../util/API/endpoint/App.endpoint'

class FileExportContainer extends PureComponent {
    state = {
        imageLink: '',
        videoLink: '',
        statistics: {},
        outputImage: {}
    }

    containerFunctions = {
        handleInputChange: this.handleInputChange.bind(this),
        handleImageClick: this.handleImageClick.bind(this),
        handleVideoClick: this.handleVideoClick.bind(this),
    };

    containerProps = () => {
        const { imageLink, videoLink } = this.state;

        return { imageLink, videoLink };
    };

    handleInputChange(e) {
        console.log('here');
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    async handleImageClick() {
        const { imageLink } = this.state;

        postImage(imageLink);
    }

    async handleVideoClick() {
        const { videoLink } = this.state;

        postVideo(videoLink);
    }

    render() {
        return (
            <FileExport
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default FileExportContainer;