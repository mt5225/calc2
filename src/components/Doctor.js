import React, {Component} from 'react';
import { connect } from 'react-redux'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { mediacalData } from '../services/dataService'
import { doctorAction,enableNextAction } from '../actions'

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
                <br/>
                <RadioButtonGroup
                    name="doctorName"
                    defaultSelected={this.props.doctorSelected}
                    onChange={this.props.doctorQ}>
                    {radioBtn}
                </RadioButtonGroup>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let doctorlist = []
    for (var index = 0; index < mediacalData.length; index++) {
        if (mediacalData[index].hospital === state.calcReducer.hospital_name) {
            doctorlist =  mediacalData[index].doctors
        }
    }
    return {
        doctors: doctorlist,
        doctorSelected: state.calcReducer.doctor_name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doctorQ: (e) => {
            let payload = {
                value: e.target.value
            }
            dispatch(doctorAction(payload))
            dispatch(enableNextAction())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctor)
