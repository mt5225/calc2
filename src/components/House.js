import React, {Component} from 'react';
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Subheader from 'material-ui/Subheader'
import { mediacalData } from '../services/dataService'
import { houseAction, careAction, cityAction } from '../actions'
import GenericDetails from './GenericDetails'
import * as CONSTANTS from '../services/constants'

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
            checkbox: {
                marginBottom: 16,
                maxWidth: 120,
            },
        }
        const radioBtn = this.props.cities.map(
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
        if (this.props.cityDetail) {
            details = '一房一卫 ' +
                this.props.cityDetail.room_1b1b +
                ' 每月， ' +
                '两房一卫 ' +
                this.props.cityDetail.room_2b1b +
                ' 每月.'
        }
        return (
            <div>
                <div>
                    <Subheader>选择居住的城市</Subheader>
                    <RadioButtonGroup
                        name="city"
                        onChange={this.props.cityQ}
                        defaultSelected={this.props.cityName}
                        >
                        {radioBtn}
                    </RadioButtonGroup>
                </div>
                <GenericDetails
                    style={this.props.style}
                    content={details}
                    />
                <Divider/>
                <div>
                    <Subheader>选择居住房型</Subheader>
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
                </div>
                <Divider/>
                <div>
                    <Subheader>月嫂服务,约6,000USD含20%小费</Subheader>
                    <Checkbox
                        label="需要"
                        value="yes"
                        style={styles.checkbox}
                        checked={this.props.need_care}
                        onCheck={this.props.careQ}
                        />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let cities = []
    for (let index = 0; index < mediacalData.length; index++) {
        if (mediacalData[index].hospital === state.calcReducer.hospital_name) {
            cities = mediacalData[index].cities
        }
    }

    //find city rent detail by state
    let city = null
    for (let index = 0; index < cities.length; index++) {
        if (cities[index].name === state.calcReducer.city) {
            city = cities[index]
        }
    }

    let style = state.uiReducer.step_3_city_house_rent === 'hidden' ? CONSTANTS.hideElement : CONSTANTS.showElement
    
    if(!city) {
        style = CONSTANTS.hideElement
    }

    return {
        house_type: state.calcReducer.house_type,
        need_care: state.calcReducer.need_care,
        cities: cities,
        cityName: state.calcReducer.city,
        cityDetail: city,
        style: style,
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
        cityQ: (e) => {
            let payload = {
                value: e.target.value
            }
            dispatch(cityAction(payload))
        },
        careQ: (e, isChecked) => {
            console.log(isChecked)
            let payload = {
                value: isChecked
            }
            dispatch(careAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(House)