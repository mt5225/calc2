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
        let subtitle = "其中医院与医生开销 " + this.props.price.total_medical_price
        subtitle += "人民币, 生活开销 " + this.props.price.total_living_price
        subtitle += "人民币，汇率按6.8计算，具体如下:"
        
        const product_type = this.props.choise.production_type === 'nature' ? "顺产24小时" : "剖腹产48小时"

        //hospital price
        const h_price = this.props.choise.production_type === 'nature' ?
            this.props.hospitalDetail.price['normal'] :
            this.props.hospitalDetail.price['csection']
        let hospitalPrice = product_type + ", 报价 "
        hospitalPrice += h_price

        //doctor price
        const d_price = this.props.choise.production_type === 'nature' ?
            this.props.doctorDetail['price_normal'] :
            this.props.doctorDetail['csection']
        let doctorPrice = product_type + ", 报价 "
        doctorPrice += d_price

        //house price
        let living = "住" + this.props.choise.stay_days
        living += "天, "
        if (this.props.choise.house_type === '1b1b') {
            living += "一房一卫, " + this.props.houseDetail['room_1b1b']
        } else {
            living += "两房一卫, " + this.props.houseDetail['room_2b1b']
        }
        living += "每月, 房费总共"
        living += this.props.price.total_living_price
        living += "人民币"
        
        let other = ""
        if (this.props.choise.car_type === 'uber') {
            other += "公交+uber, 约200USD每月"
        } else {
            other += ",自己租车约1,500每月"
        }
        other += this.props.choise.need_care? " 月嫂6,000USD (含20%小费)": ""

        return (
            <div>
                <Card initiallyExpanded={true}>
                    <CardHeader
                        title={title}
                        titleStyle={{ fontSize: 'large' }}
                        subtitle={subtitle}
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                    <CardText expandable={true} >
                        <List>
                            <ListItem
                                primaryText={"医院 " + this.props.choise.hospital_name}
                                secondaryText={hospitalPrice}
                                secondaryTextLines={2}
                                />
                            <ListItem
                                primaryText={"医生 " + this.props.choise.doctor_name}
                                secondaryText={doctorPrice}
                                secondaryTextLines={2}
                                />
                            <ListItem
                                primaryText={"住 " + this.props.choise.city}
                                secondaryText={living}
                                secondaryTextLines={2}
                                />
                            <ListItem
                                primaryText={"其他"}
                                secondaryText={other}
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