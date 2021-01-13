import { PureComponent } from 'react';
import Statistics from './Statistics.component';
import { getStatistics, getFrame } from '../../util/API/endpoint/App.endpoint'

class StatisticsContainer extends PureComponent {
    state = {
        statistics: {},
        frameImage: ''
    }

    containerFunctions = {
        format: this.format.bind(this),
        getFrame: this.getFrame.bind(this)
    };

    componentDidMount() {
        this.setStatistics();
    }

    componentDidUpdate() {
        this.setStatistics();
    }

    setStatistics() {
        this.setState({
            statistics: getStatistics()
        });
    }

    containerProps = () => {
        const { statistics, frameImage } = this.state;

        return { statistics, frameImage };
    };

    getFrame() {
        this.setState({
            frameImage: getFrame()
        });        
    }

    format(time) {   
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;
    
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    render() {
        return (
            <Statistics
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default StatisticsContainer;