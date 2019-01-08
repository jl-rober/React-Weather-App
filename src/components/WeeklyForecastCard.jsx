import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    card: {
        maxWidth: 345,
        margin: '30px 10px',
        backgroundColor: 'rgba(125,125,125,0.7)',
        width: '20%'
    },
    media: {
        height: '71px',
        width: '70%',
        margin: '4px auto'
    },
};

let weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

class MediaCard extends React.Component {
    render() {
        const {classes} = this.props;
        let details = {
            day: "",
            temp: "",
            weather: "",
            icon: ""
        };

        if (this.props.forecast) {
            const forecast = this.props.forecast;
            details.humidity = forecast.main.humidity;
            details.pressure = forecast.main.pressure;
            details.temp = forecast.main.temp.toFixed(0) + '\u00b0';
            details.icon = forecast.weather[0].icon;
            details.day = weekday[forecast.day];
            let tempString = "";

            for(let i = 0; i < forecast.weather.length; i++) {
                tempString += forecast.weather[i].main;
                if(i + 1 < forecast.weather.length) {
                    tempString += "/";
                }
            }
            details.weather = tempString;
        }

        let imageUrl = "/images/weather-icons/" + details.icon + ".png";

        return (
            <Card className={classes.card}>
                <h4>{details.day}</h4>
                <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <div className={classes.root}>
                        <h4 className="dayFcHead">{details.weather}</h4>
                        <h4>{details.temp}</h4>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);