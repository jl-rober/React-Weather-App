import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
        return (
            <div className={classes.root}>
                <h3 className="dayFcHead">{this.props.details.weather}</h3>
                <Table className={classes.table + " dayFcTable"}>
                    <TableBody>
                        <TableRow>
                            <TableCell>Temperature</TableCell>
                            <TableCell>{this.props.details.temp}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Humidity</TableCell>
                            <TableCell>{this.props.details.humidity}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Pressure</TableCell>
                            <TableCell>{this.props.details.pressure}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Wind Speed</TableCell>
                            <TableCell>{this.props.details.windSpeed}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);