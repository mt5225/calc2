import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper'

class GenericDetails extends Component {

    render() {
        const styles = {
            content: {
                color: 'rgba(0, 0, 0, 0.5)',
                fontSize: '14px',
                margin: 10,
                overflowX: 'auto'
            }
        }
        return (
            <div>
                <Paper style={this.props.style} zDepth={1} rounded={false}>
                    <p style={styles.content}> {this.props.content}</p>
                </Paper>
            </div>
        );
    }
}

GenericDetails.propTypes = {
    content: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
};

export default GenericDetails