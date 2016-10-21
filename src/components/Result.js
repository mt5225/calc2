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
        let living = ""
        if (this.props.choise.house_type === '1b1b') {
            living += "一房一卫, 报价 " + this.props.houseDetail['room_1b1b']
        } else {
            living += "两房一卫, 报价 " + this.props.houseDetail['room_2b1b']
        }
        living += " 每月, 共住" + this.props.choise.stay_days
        living += "天"

        let other = ""
        if (this.props.choise.car_type === 'uber') {
            other += "公交+uber, 约200USD每月"
        } else {
            other += ",自己租车约1,500每月"
        }
        other += this.props.choise.need_care ? " 月嫂6,000USD (含20%小费)" : ""

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
                                secondaryTextLines={1}
                                />
                            <ListItem
                                primaryText={"医生 " + this.props.choise.doctor_name}
                                secondaryText={doctorPrice}
                                secondaryTextLines={1}
                                />
                            <ListItem
                                primaryText={"住 " + this.props.choise.city}
                                secondaryText={living}
                                secondaryTextLines={1}
                                />
                            <ListItem
                                secondaryText={"注：租金是根据洛杉矶本地全家具服务式公寓，包水电气及上网费用进行估算，仅供参考。"}
                                secondaryTextLines={2}
                                />
                            <ListItem
                                primaryText={"其他"}
                                secondaryText={other}
                                secondaryTextLines={2}
                                />
                            <ListItem                    
                                secondaryText={"注：交通费用是根据一家人超市购物，产检等必要需求估算，租车费用根据常规租车公司带保险价格估算，仅供参考。"}
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