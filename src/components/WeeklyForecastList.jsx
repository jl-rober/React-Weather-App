import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'rgba(125,125,125,0)'
    },
    table: {
        color: 'white'
    }
});

class SimpleList extends React.Component {
    render() {
        const {classes} = this.props;
        let details = {
            humidity: "",
            pressure: "",
            temp: "",
            sunrise: "",
            sunset: "",
            weather: "",
            weatherDesc: "",
            windSpeed: "",
            description: ""
        };

        if (this.props.forecast) {
            const forecast = this.props.forecast;
            details.humidity = forecast.main.humidity;
            details.pressure = forecast.main.pressure;
            details.temp = forecast.main.temp;
            let tempString = "";

            for(let i = 0; i < forecast.weather.length; i++) {
                tempString += forecast.weather[i].main;
                if(i + 1 < forecast.weather.length) {
                    tempString += "/";
                }
            }
            details.weather = tempString;
        }

        return (
            <div className={classes.root}>
                <h4 className="dayFcHead">{details.weather}</h4>
                <h4>{details.temp}</h4>
            </div>
        );
    }
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);