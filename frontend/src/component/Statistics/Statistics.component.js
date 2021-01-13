import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Statistics.style.scss';

class Statistics extends PureComponent {
    static propTypes = {
        format: PropTypes.func.isRequired,
        getFrame: PropTypes.func.isRequired,
        frameImage: PropTypes.string.isRequired
    };

    statistics = {
        frame_number: 5298,
        fps: 23, 
        7: {167: 'cigarete: 92 %'}, 
        25: {580: 'cigarete: 84 %'}, 
        26: {592: 'cigarete: 91 %'}, 
        29: {676: 'cigarete: 83 %'}, 
        33: {760: 'cigarete: 70 %'}, 
        67: {1538: 'cigarete: 72 %'}, 
        69: {1591: 'cigarete: 78 %'}, 
        93: {2136: 'cigarete: 70 %'}, 
        120: {2753: 'cigarete: 70 %'},
        165: {3784: 'cigarete: 85 %'},
        177: {4081: 'cigarete: 70 %'},
        196: {4517: 'cigarete: 79 %',
        4518: 'cigarete: 79 %'},
        197: {4521: 'cigarete: 77 %', 4523: 'cigarete: 76 %', 4531: 'cigarete: 97 %'}}

    renderStatistics() {
        const { 
            frame_number,
            fps,
            ...seconds
        } = this.statistics;

        console.log(seconds);
        const items = Object.entries(seconds) || [];

        return (
            <div>
                <h4>{ `Number of frames in video: ${frame_number}` }</h4>
                <h4>{ `FPS: ${fps}` }</h4>
                { this.renderImage() }
                <div className="Statistics-TableHeading">
                    <h5>Seconds</h5>
                    <h5>Frame</h5>
                    <h5>Output</h5>
                </div>
                { items.map(this.renderStatisticsRow)}
            </div>
        );
    }

    renderStatisticsRow = (item) => {
        const { format } = this.props;
        const [second, frames] = item;
        const frameArray = Object.entries(frames) || [];
        console.log(second, frames)

        return (
            <div className="Statistics-TableRow">
                <h4>{ format(second) }</h4>
                <div className="Statistics-TableFrames">
                    { frameArray.map(this.renderFrame)}
                </div>
            </div>
        );
    }

    renderImage() {
        const { frameImage } = this.props;

        if (!frameImage) {
            return null;
        }

        return (
            <div>
                <h4>Image:</h4>
                <img src={ frameImage } alt="frameImage"/>
            </div>
        );
    }

    renderFrame = (frame) => {
        const { getFrame } = this.props;
        const [frameNumber, output] = frame;

        return (
            <>
                <button onClick={ getFrame }>{ frameNumber }</button>
                <div>{ output }</div>
            </>
        );
    }

    render() {
        return (
            <div className="Statistics">
                <h3>Output from video:</h3>
                { this.renderStatistics() }
            </div>
        );
    }
}

export default Statistics;
