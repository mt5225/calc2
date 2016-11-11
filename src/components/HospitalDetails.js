import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Divider from 'material-ui/Divider'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'

class HospitalDetails extends Component {

    render() {
        let hospital_detail = ''
        const styles = {
            desc: {
                fontSize: 14,
                textAlign: 'left',

            }
        }
        if (this.props.detail) {
            hospital_detail = (
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Card initiallyExpanded={true}>
                        <CardHeader
                            subtitle={this.props.detail.address}
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                        <CardText expandable={true} >
                            <span style={styles.desc}>
                                &nbsp; &nbsp; &nbsp; {this.props.detail.description}
                                &nbsp;{'产科综合评分: ' + this.props.detail.rating}
                            </span>

                        </CardText>
                    </Card>
                </MuiThemeProvider>
            )
        }

        return (
            <div>
                {hospital_detail}
            </div>
        );
    }
}

HospitalDetails.propTypes = {
    detail: PropTypes.object,
    style: PropTypes.object.isRequired,
};

export default HospitalDetails