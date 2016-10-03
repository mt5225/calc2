import React, {Component} from 'react';
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Subheader from 'material-ui/Subheader';
import { houseAction, careAction } from '../actions'

class House extends Component {

    render() {
        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 16,
            },
            toggle: {
                marginBottom: 16,
                maxWidth: 120,
            },
        }
        return (
            <div>
             <Subheader>选择房型</Subheader>
                <RadioButtonGroup 
                name="houseType" 
                defaultSelected={this.props.house_type} 
                onChange={this.props.houseQ}
                >
                    <RadioButton
                        value="1b1b"
                        label="一房一卫"
                        style={styles.radioButton}
                        />
                    <RadioButton
                        value="2b1b"
                        label="两房一卫"
                        style={styles.radioButton}
                        />
                </RadioButtonGroup>
                <div>
                    <Divider/>
                    <br/>               
                     <Toggle
                        defaultToggled={this.props.need_care}
                        label="需要月嫂"
                        style={styles.toggle}
                        onToggle={this.props.careQ}
                    />   
                    <br/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        house_type: state.calcReducer.house_type,
        need_care: state.calcReducer.need_care
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        houseQ: (e) => {
            let payload = {
                value: e.target.value
            }
            dispatch(houseAction(payload))
        },
        careQ: (e) => {

            let payload = {
                value: e.target.value === "on" ? true : false
            }
            dispatch(careAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(House)