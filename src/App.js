import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import PlacesAutoComplete from './components/PlacesAutocomplete';
import Body from './components/Body';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayForecast: "",
            weekForecast: "",
            location: {
                lat: 48.858608,
                lng: 2.294471
            }
        };

        this.specifyLocation = this.specifyLocation.bind(this);
    }

    specifyLocation(location) {
        fetch('https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + location.lat.toFixed(0) + '&lon=' + location.lng.toFixed(0) + '&APPID=310036b1a838f4b9ce63ac7d2886a803')
            .then(res => { return res.json() })
            .then(res => { this.setState({location: location, dayForecast: res});});

        fetch('https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + location.lat.toFixed(0) + '&lon=' + location.lng.toFixed(0) + '&APPID=310036b1a838f4b9ce63ac7d2886a803')
            .then(res => { return res.json() })
            .then(res => { this.setState({weekForecast: res});});
    }

    render() {
        return (
            <div className="App">
                <div className="backgroundImage"></div>
                <Header>
                    <PlacesAutoComplete specifyLocation={this.specifyLocation}/>
                </Header>
                <Body location={this.state.location} specifyLocation={this.specifyLocation} dayForecast={this.state.dayForecast} weekForecast={this.state.weekForecast}/>
            </div>
        );
    }
}

export default App;
