import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { fullWhite } from 'material-ui/styles/colors'

class GenericDetails extends Component {

    render() {
        const styles = {
            content: {
                color: fullWhite,
                fontSize: '14px',
                margin: 10,
                overflowX: 'auto'
            }
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Paper style={this.props.style} zDepth={1} rounded={false}>
                        <p style={styles.content}> {this.props.content}</p>
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}

GenericDetails.propTypes = {
    content: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
};

export default GenericDetails