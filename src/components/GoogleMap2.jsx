import React from 'react'
import '../styles/googleMap.css';
import MapMenu from './MapMenu';

class GoogleMap2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            map: {},
            mapCenter: {
                lat: 48.858608,
                lng: 2.294471
            },
            mapType: 'clouds_new'
        };

        this.updateMapType = this.updateMapType.bind(this);
    }

    componentDidMount() {
        if(this.props.location) {
            let location = this.props.location;
            this.setState({ mapCenter: {lat: location.lat, lng: location.lng} })
        }

        this.map = new window.google.maps.Map(this.refs.map, {
            center: this.state.mapCenter,
            zoom: 5,
            mapTypeControlOptions: {
                mapTypeIds: ['clouds']
            }
        });

        this.cloudsMapType = new window.google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
                return "https://tile.openweathermap.org/map/clouds_new/" +
                    zoom + "/" + coord.x + "/" + coord.y + ".png?appid=310036b1a838f4b9ce63ac7d2886a803";
            },
            tileSize: new window.google.maps.Size(256, 256),
            maxZoom: 9,
            minZoom: 0,
            radius: 1738000,
            name: 'Clouds'
        });

        this.map.overlayMapTypes.push(this.cloudsMapType);

        this.setState({
            map: this.map,
            mapOverlay: this.cloudsMapType
        });
    }

    componentDidUpdate() {
        let location = this.props.location;

        if(Object.keys(this.state.map).length > 0) {
            let latLng = new window.google.maps.LatLng(location.lat, location.lng);
            this.state.map.panTo(latLng);
        } else {
            console.log('Map unavailable');
        }
    }

    updateMapType(type) {
        this.setState({ mapType: type });
        var that = this;

        var mapType = new window.google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
                return "https://tile.openweathermap.org/map/" + that.state.mapType + "/" +
                    zoom + "/" + coord.x + "/" + coord.y + ".png?appid=310036b1a838f4b9ce63ac7d2886a803";
            },
            tileSize: new window.google.maps.Size(256, 256),
            maxZoom: 9,
            minZoom: 0,
            radius: 1738000,
            name: type
        });

        let latLng = this.map.getCenter();
        console.log(latLng);

        this.props.specifyLocation({ lat: latLng.lat(), lng: latLng.lng() });

        this.map.overlayMapTypes.pop();
        this.map.overlayMapTypes.push(mapType);
    }

    render() {

        return(
            <div className="googleMapContainer">
                <MapMenu updateMapType={this.updateMapType}/>
                <div ref="map" id="map">I should be a map!</div>
            </div>
        )
    }
}

export default GoogleMap2;