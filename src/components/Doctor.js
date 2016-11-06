import React, { Component } from 'react';
import { connect } from 'react-redux'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { doctorAction } from '../actions'
import DoctorDetail from './DoctorDetail'
import * as CONSTANTS from '../services/constants'
import * as UTIL from '../services/util'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class Doctor extends Component {
    render() {
        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 12,
            },
        }

        const radioBtn = this.props.doctors.map(
            (item) => {
                return (
                    <RadioButton
                        value={item.name}
                        label={item.name}
                        key={item.name}
                        style={styles.radioButton}
                        />
                )
            }
        )

        return (
            <div>
                <br />
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <RadioButtonGroup
                        name="doctorName"
                        defaultSelected={this.props.doctorSelected}
                        onChange={this.props.doctorQ}>
                        {radioBtn}
                    </RadioButtonGroup>
                </MuiThemeProvider>
                <DoctorDetail
                    style={this.props.style}
                    doctor={this.props.doctorDetail}
                    />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let doctorlist = UTIL.getDoctorListByHospitalName(state.calcReducer.hospital_name,
        state.dataReducer.records)
    let doctor = null

    for (let index = 0; index < doctorlist.length; index++) {
        if (doctorlist[index].name === state.calcReducer.doctor_name) {
            doctor = doctorlist[index]
        }
    }

    return {
        doctors: doctorlist,
        doctorSelected: state.calcReducer.doctor_name,
        doctorDetail: doctor,
        style: state.uiReducer.step_1_doctor_desc === 'hidden' ?
            CONSTANTS.hideElement : CONSTANTS.showElement,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doctorQ: (e) => {
            let payload = {
                value: e.target.value
            }
            dispatch(doctorAction(payload))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctor)
