import React, { Component } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { mediacalData } from '../services/dataService'
import { connect } from 'react-redux'
import { hospitalAction, productionAction } from '../actions'

class Hospital extends Component {
    render() {
        const menuItem = mediacalData.map(
            (item) => {
                return <MenuItem key={item.id} value={item.hospital} primaryText={item.hospital}/>
            }
        )
        const defaultHospital = mediacalData[0].hospital

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
                <DropDownMenu value={defaultHospital} onChange={this.props.hospitalQ}>
                    {menuItem}
                </DropDownMenu>
                <p></p>
                <RadioButtonGroup name="productionType" defaultSelected="nature" onChange={this.props.productionQ}>
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
            </div>
        );
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

export default connect(null, mapDispatchToProps)(Hospital)