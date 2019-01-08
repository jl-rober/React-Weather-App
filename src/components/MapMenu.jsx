import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    mapMenuIcon: {
        background: 'white',
        borderRadius: 100,
        border: 0,
        color: 'gray',
        height: 48,
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
        margin: '9px',
        '&:hover': {
            backgroundColor: 'white',
            color: 'black'
        }
    }
};

class SimpleMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (e, i) => {
        console.log(i);
        this.props.updateMapType(i);
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;

        return (
            <div className="mapMenu">
                <IconButton
                    aria-label="More"
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    classes={{
                        root: classes.mapMenuIcon // class name, e.g. `classes-nesting-root-x`
                    }}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={e => this.handleClose(e, 'clouds_new')} value="clouds">Clouds</MenuItem>
                    <MenuItem onClick={e => this.handleClose(e, 'precipitation_new')} value="precipitation">Precipitation</MenuItem>
                    <MenuItem onClick={e => this.handleClose(e, 'pressure_new')} value="sea-level">Sea level pressure</MenuItem>
                    <MenuItem onClick={e => this.handleClose(e, 'wind_new')} value="wind-speed">Wind speed</MenuItem>
                    <MenuItem onClick={e => this.handleClose(e, 'temp_new')} value="temp">Temperature</MenuItem>
                </Menu>
            </div>
        );
    }
}

SimpleMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMenu);