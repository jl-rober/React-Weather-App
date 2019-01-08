import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../styles/header.css';

const styles = {
    root: {
        flexGrow: 1,
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 999
    },
    test: {
        height: '7vh',
        backgroundColor: 'rgba(255,255,255,0.33)'
    },
    header: {
        margin: '0 auto'
    }
};

class SimpleAppBar extends React.Component {

    render()
    {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default" className={classes.test}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.header}>
                            {this.props.children}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);