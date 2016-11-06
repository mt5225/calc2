import React, { Component } from 'react';
import { connect } from 'react-redux'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Subheader from 'material-ui/Subheader'
import { carAction } from '../actions'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class Car extends Component {
    render() {
        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 16,
            },
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                    <Subheader>租车:1500USD/月，公交+uber每月约200USD</Subheader>
                    <RadioButtonGroup
                        name="carType"
                        defaultSelected={this.props.car_type}
                        onChange={this.props.carQ}
                        >
                        <RadioButton
                            value="uber"
                            label="公交 + uber"
                            style={styles.radioButton}
                            />
                        <RadioButton
                            value="rent car"
                            label="租车"
                            style={styles.radioButton}
                            />
                    </RadioButtonGroup>
                    <br />
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        car_type: state.calcReducer.car_type,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        carQ: (e) => {
            let payload = {
                value: e.target.value
            }
            dispatch(carAction(payload))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Car);