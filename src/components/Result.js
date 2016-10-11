import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import { resetAction } from '../actions'
import calcPrice from '../services/calc'

class Result extends Component {
    render() {
        const title = "估计花销 " + this.props.price.total_price + " 人民币"
        let medicalTitle = "医院与医生: "
        medicalTitle += this.props.choise.production_type === 'nature' ? "顺产": "剖腹产"
        medicalTitle += "情况下,约"
        medicalTitle += this.props.price.total_medical_price
        medicalTitle += "人民币"

        let medical = "医院" + this.props.choise.hospital_name
        medical += " 医生" + this.props.choise.doctor_name

        let livingTitle = "食宿与交通: 逗留"
        livingTitle += this.props.choise.stay_days
        livingTitle += "天,约"
        livingTitle += this.props.price.total_living_price
        livingTitle += "人民币"
        let living = "住" + this.props.choise.city + ", 房型为"
        if (this.props.choise.house_type === '1b1b') { living += "一房一卫, " } else { living += "两房一卫, " }
        if (this.props.choise.need_care) { living += "需要月嫂," } else { living += "不需要月嫂," }
        if (this.props.choise.car_type === 'uber') { living += "交通方式为公交+uber" } else { living += "交通方式为自己租车" }
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
                        } }/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        choise: state.calcReducer,
        price: calcPrice(state.calcReducer)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetAction: () => {
            dispatch(resetAction())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result)