import React from 'react';
import '../styles/body.css';
import GoogleMap2 from './GoogleMap2';
import DayForecastCard from './DayForecastCard';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WeeklyForecastCard from './WeeklyForecastCard';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: '96px'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: this.props.location
        }
    }

    render() {
        let output = "";

        if(this.props.weekForecast) {
            output = this.props.weekForecast.list.map(function (e, i) {
                let date = new Date(e.dt_txt + " UTC");
                if(date.getHours() === 11) {
                    let day = date.getDay();
                    e.day = day;

                    return (
                        <WeeklyForecastCard forecast={e} key={i}/>
                    )
                }
            });
        } else {

        }

        return(
            <div id="body">
                <DayForecastCard forecast={this.props.dayForecast}/>
                <GoogleMap2 location={this.props.location} specifyLocation={this.props.specifyLocation}/>
                <div className="weeklyForecastContainer">
                    {output}
                </div>
            </div>
        )
    }
}

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);