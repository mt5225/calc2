import React, { Component } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import { mediacalData } from '../services/dataService'
import { connect } from 'react-redux'
import { hospitalAction, productionAction } from '../actions'
import Description from './Description'
import * as CONSTANTS from '../services/constants'

class Hospital extends Component {
    render() {
        const menuItem = mediacalData.map(
            (item) => {
                return <MenuItem
                    key={item.id}
                    value={item.hospital}
                    primaryText={item.hospital}
                    />
            }
        )

        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 16,
            },
        }
        let details = ''
        if (this.props.hospitalDetail) {
            details = this.props.hospitalDetail.description +
                ', ' +
                ' 地址: ' +
                this.props.hospitalDetail.address
        }
        return (
            < div >
                <Subheader> 选择医院 </Subheader>
                <DropDownMenu value={this.props.hospital} onChange={this.props.hospitalQ} openImmediately={true}>
                    {menuItem}
                </DropDownMenu>
                <br/>
                <Description style={this.props.style}  content={details} />
                <Divider/>
                <br/>
                <Subheader> 选择生产方式 </Subheader>
                <RadioButtonGroup name="productionType"
                    defaultSelected={this.props.production_type}
                    onChange={this.props.productionQ}>
                    <RadioButton
                        value="nature"
                        label="顺产"
                        style={styles.radioButton}
                        />
                    <RadioButton
                        value="c_section"
                        label="剖腹产"
                        style={styles.radioButton}
                        />
                </RadioButtonGroup>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    let hospitalDetail = {}
    if (state.calcReducer.hospital_name.length > 1) {
        for (var index = 0; index < mediacalData.length; index++) {
            if (mediacalData[index].hospital === state.calcReducer.hospital_name) {
                hospitalDetail = mediacalData[index]
            }
        }

    }

    return {
        hospital: state.calcReducer.hospital_name,
        production_type: state.calcReducer.production_type,
        hospitalDetail: hospitalDetail,
        style: state.uiReducer.step_0_hospital_desc === 'hidden' ? CONSTANTS.hideElement : CONSTANTS.showElement
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hospitalQ: (e) => {
            let payload = {
                value: e.target.textContent
            }
            dispatch(hospitalAction(payload))
        },
        productionQ: (e) => {
            let payload = {
                value: e.target.value
            }
            dispatch(productionAction(payload))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hospital)