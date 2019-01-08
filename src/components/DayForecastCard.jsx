import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DayForecastList from './DayForecastList';
import '../styles/dayForecastCard.css';

const styles = {
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(125,125,125,0.7)',
        margin: '0 auto',
        gridRowStart: '1',
        gridRowEnd: '5'
    },
    media: {
        // ⚠️ object-fit is not supported by IE11.
        margin: '20px auto',
        width: 'auto'
    },
};

class ImgMediaCard extends React.Component {
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
            description: "",
            icon: "01n"
        };

        if (this.props.forecast) {
            const forecast = this.props.forecast;
            details.humidity = forecast.main.humidity;
            details.pressure = forecast.main.pressure;
            details.temp = forecast.main.temp.toFixed(0) + "\u00b0";
            let date = new Date(parseInt(forecast.sys.sunrise, 10));
            details.sunrise = date.getHours() + ":" + date.getMinutes();
            details.sunset = forecast.sys.sunset;
            details.icon = forecast.weather[0].icon;
            let tempString = "";

            for(let i = 0; i < forecast.weather.length; i++) {
                tempString += forecast.weather[i].main;
                if(i + 1 < forecast.weather.length) {
                    tempString += "/";
                }
            }
            details.weather = tempString;

            details.description = forecast.weather[0].description;

            details.windSpeed = forecast.wind.speed;
        }

        let imageUrl = "/images/weather-icons/" + details.icon + ".png";

        return (
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={imageUrl}
                    title="Sunny"
                />
                <CardContent>
                    <DayForecastList details={details}/>
                </CardContent>
            </Card>
        );
    }
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);