import React, {Component} from 'react';
import { connect } from 'react-redux'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { mediacalData } from '../services/dataService'
import { doctorAction } from '../actions'
import Description from './Description'
import * as CONSTANTS from '../services/constants'

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
        let details = ''
        if (this.props.doctorDetail) {
            details = this.props.doctorDetail.description +
                ', 报价： 顺产 ' + 
                this.props.doctorDetail.price_normal + 
                '，剖腹产 ' +
                this.props.doctorDetail.csection +
                '.'
        }
        return (
            <div>
                <br/>
                <RadioButtonGroup
                    name="doctorName"
                    defaultSelected={this.props.doctorSelected}
                    onChange={this.props.doctorQ}>
                    {radioBtn}
                </RadioButtonGroup>
                <br/>
                <Description
                    style={this.props.style}
                    content={details}
                    />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let doctorlist = []
    for (let index = 0; index < mediacalData.length; index++) {
        if (mediacalData[index].hospital === state.calcReducer.hospital_name) {
            doctorlist = mediacalData[index].doctors
        }
    }
    let doctor = {}
    for (let index = 0; index < doctorlist.length; index++) {
        if (doctorlist[index].name === state.calcReducer.doctor_name) {
            doctor = doctorlist[index]
        }
    }

    return {
        doctors: doctorlist,
        doctorSelected: state.calcReducer.doctor_name,
        doctorDetail: doctor,
        style: state.uiReducer.step_1_doctor_desc === 'hidden' ? CONSTANTS.hideElement : CONSTANTS.showElement,
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
