import React, { Component } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Subheader from 'material-ui/Subheader'
import { mediacalData } from '../services/dataService'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { hospitalAction, productionAction } from '../actions'
import HospitalDetails from './HospitalDetails'
import GenericDetails from './GenericDetails'
import * as CONSTANTS from '../services/constants'
import * as UTIL from '../services/util'

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

        return (
            <div>
                <Subheader> 选择医院 </Subheader>
                <DropDownMenu value={this.props.hospital} onChange={this.props.hospitalQ} openImmediately={true}>
                    {menuItem}
                </DropDownMenu>
                <br/>
                <HospitalDetails style={this.props.hospitalDetailStyle}  detail={this.props.hospitalDetail} />
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
                <GenericDetails style={this.props.PriceDetails} content={this.props.priceDetail}/>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    let hospitalDetail = UTIL.getHospitalDetailByName(state.calcReducer.hospital_name)
    let priceDetail = '医院报价：'
    if (hospitalDetail) {
        if (state.calcReducer.production_type.length > 0) {
            priceDetail += state.calcReducer.production_type === 'nature' ?
                '顺产48小时 ' + hospitalDetail.price.normal : '剖腹产72小时 ' + hospitalDetail.price.csection
        }
    }
    return {
        hospital: state.calcReducer.hospital_name,
        production_type: state.calcReducer.production_type,
        hospitalDetail: hospitalDetail,
        hospitalDetailStyle: state.uiReducer.step_0_hospital_desc === 'hidden' ?
            CONSTANTS.hideElement : CONSTANTS.showElement,
        PriceDetails: state.uiReducer.step_0_hospital_price === 'hidden' ?
            CONSTANTS.hideElement : CONSTANTS.showElement,
        priceDetail: priceDetail,
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