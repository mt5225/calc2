import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import { resetAction } from '../actions'
import calcPrice from '../services/calc'
import * as UTIL from '../services/util'

class Result extends Component {
    render() {
        const title = "估计花销 " + this.props.price.total_price + " 人民币"
        let medicalTitle = "医院与医生: "
        const product_type = this.props.choise.production_type === 'nature' ? "顺产24小时" : "剖腹产48小时"
        const hospital_price = this.props.choise.production_type === 'nature' ?
            this.props.hospitalDetail.price['normal'] :
            this.props.hospitalDetail.price['csection']
        const doctor_price = this.props.choise.production_type === 'nature' ?
            this.props.doctorDetail['price_normal'] :
            this.props.doctorDetail['csection']
        medicalTitle += product_type + "情况下,约"
        medicalTitle += this.props.price.total_medical_price + "人民币"

        let medical = "医院" + this.props.choise.hospital_name
        medical += " " + product_type
        medical += "报价 " + hospital_price
        medical += ", 医生" + this.props.choise.doctor_name
        medical += " " + product_type
        medical += "报价 " + doctor_price

        let livingTitle = "食宿与交通: 逗留"
        livingTitle += this.props.choise.stay_days
        livingTitle += "天,约"
        livingTitle += this.props.price.total_living_price
        livingTitle += "人民币"
        let living = "住" + this.props.choise.city + ", 房型为"
        if (this.props.choise.house_type === '1b1b') { 
            living += "一房一卫, 报价" + this.props.houseDetail['room_1b1b'] 
        } else { 
            living += "两房一卫, 报价" + this.props.houseDetail['room_2b1b'] 
        }
        living += ", "
        if (this.props.choise.need_care) { living += "需要月嫂, 约6,000USD (含15%小费), " } else { living += "不需要月嫂," }
        if (this.props.choise.car_type === 'uber') {
            living += "交通方式为公交+uber, 约200USD每月"
        } else {
            living += "交通方式为自己租车, 约1,500每月"
        }

        return (
            <div>
                <Card initiallyExpanded={true}>
                    <CardHeader
                        title={title}
                        titleStyle={{ fontSize: 'large' }}
                        subtitle="具体如下"
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                    <CardText expandable={true} >
                        <List>
                            <ListItem
                                primaryText={medicalTitle}
                                secondaryText={medical}
                                secondaryTextLines={2}
                                />
                            <ListItem
                                primaryText={livingTitle}
                                secondaryText={living}
                                secondaryTextLines={2}
                                />
                        </List>
                    </CardText>
                    <CardActions>
                        <FlatButton label="分享计算结果" />
                        <FlatButton label="重头开始" primary={true} onClick={(event) => {
                            event.preventDefault()
                            this.props.resetAction()
                        } } />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        choise: state.calcReducer,
        price: calcPrice(state.calcReducer),
        hospitalDetail: UTIL.getHospitalDetailByName(state.calcReducer.hospital_name),
        doctorDetail: UTIL.getDoctorFromListByName(UTIL.getDoctorListByHospitalName(
            state.calcReducer.hospital_name),
            state.calcReducer.doctor_name),
        houseDetail: UTIL.getHouseDetailByHospitalAndHouseName(
            state.calcReducer.hospital_name, 
            state.calcReducer.city)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetAction: () => {
            dispatch(resetAction())
            dispatch(push('/'))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result)