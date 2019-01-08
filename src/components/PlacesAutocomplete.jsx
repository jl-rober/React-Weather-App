import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200,
        color: 'white'
    },
    menu: {
        width: 200,
    },
    InputCnt: {
        margin: '0 auto'
    }
});

const inputProps = {
    style: {color: 'white', textAlign: 'center'},
};

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => { this.props.specifyLocation(latLng); })
            .catch(error => console.error('Error', error));
        this.setState({ address });
    };

    render() {
        const { classes } = this.props;
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                searchOptions={{types: ["(regions)"]}}
                className={classes.InputCnt}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="autocomplete-container">
                        <TextField
                            {...getInputProps({
                                id: "with-placeholder",
                                placeholder: "Search Places ...",
                                className: classes.textField,
                                margin:"normal",
                                inputProps: inputProps
                            })}
                        />
                        <div className="autocomplete-dropdown-container list-group">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                let className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span className="list-group-item dropdown-item">{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}
LocationSearchInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationSearchInput);