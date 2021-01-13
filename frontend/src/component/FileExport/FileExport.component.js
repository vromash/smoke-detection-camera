import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './FileExport.style.scss';
import Statistics from '../Statistics/Statistics.component';

class FileExport extends PureComponent {
    static propTypes = {
        imageLink: PropTypes.string.isRequired,
        videoLink: PropTypes.string.isRequired,
        handleInputChange: PropTypes.func.isRequired,
        handleImageClick: PropTypes.func.isRequired,
        handleVideoClick: PropTypes.func.isRequired,
        outputImage: PropTypes.object.isRequired,
        statistics: PropTypes.object.isRequired
    };

    renderImageForm() {
        const { imageLink, handleInputChange, handleImageClick } = this.props;
        
        return (
            <div className="FileExport-Container">
                <div className="FileExport-InputField">
                    <label htmlFor="sku">Enter image url</label>
                    <input 
                      type="text"
                      id="imageLink" 
                      name="imageLink" 
                      value={ imageLink }
                      onChange={ handleInputChange } 
                      required="" 
                    />
                </div>
                <button onClick={ handleImageClick }>Analyze</button>
            </div>
        );
    }

    renderVideoButton() {
        const { videoLink, handleInputChange, handleVideoClick } = this.props;

        return (
            <div className="FileExport-Container">
                <div className="FileExport-InputField">
                    <label htmlFor="sku">Enter video url</label>
                    <input 
                      type="text"
                      id="videoLink" 
                      name="videoLink" 
                      value={ videoLink }
                      onChange={ handleInputChange } 
                      required="" 
                    />
                </div>
                <button onClick={ handleVideoClick }>Analyze</button>
            </div>
        );
    }

    renderImage() {
        const { outputImage } = this.props;

        if (!outputImage) {
            return null;
        }

        return (
            <div>
                <h4>Output:</h4>
                <img src={ outputImage } alt="frameImage"/>
            </div>
        );
    }

    renderStatistics() {
        const { statistics } = this.props;

        if (!statistics) {
            return null;
        }

        return (
            <Statistics
                statistics={ statistics }
            />
        );
    }

    render() {
        return (
            <div className="FileExport">
                <h3>Send video or image for neural network analysis</h3>
                { this.renderImageForm() }
                { this.renderImage() }
                { this.renderVideoButton() }
                { this.renderStatistics() }
            </div>
        );
    }
}

export default FileExport;
