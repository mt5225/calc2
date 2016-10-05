import React from 'react'
import { connect } from 'react-redux'
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Hospital from './Hospital'
import Doctor from './Doctor'
import StayDays from './StayDays'
import House from './House'
import Car from './Car'
import { finishAction, nextAction, prevAction, resetAction } from '../actions'

class VerticalLinearStepper extends React.Component {

    constructor(props) {
        super(props);
        this.renderStepActions = (step) => {
            return (
                <div style={{ margin: '12px 0' }}>
                    <RaisedButton
                        label={this.props.stepIndex === 4 ? '完成' : '下一步'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        disabled={this.props.nextBtnDisable}
                        onTouchTap={this.props.stepIndex === 4 ? this.props.finishAction : this.props.nextAction}
                        style={{ marginRight: 12 }}
                        />
                    {step > 0 && (
                        <FlatButton
                            label="上一步"
                            disabled={this.props.stepIndex === 0}
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            onTouchTap={this.props.prevAction}
                            />
                    ) }
                </div>
            );
        }
    }

    render() {
        const title = "估计花销 " + this.props.total_price + " 人民币"
        let medical = ""
        if(this.props.choise.production_type === 'nature')  {medical += "顺产"} else {medical += "剖腹产"}
        medical += " 医院 " + this.props.choise.hospital_name
        medical += " 医生" + this.props.choise.doctor_name
        
        let living = ""
        living += " 在美逗留" + this.props.choise.stay_days + "天,"
        living += "住在 " + this.props.choise.city + ", 房型为"
        if(this.props.choise.house_type === '1b1b') {living += "一房一卫, "} else {living += "两房一卫, "}
        if(this.props.choise.need_care) {living += "需要月嫂,"} else {living += "不需要月嫂,"}
        if(this.props.choise.car_type === 'uber'){living += "交通方式为公交+uber"} else {living += "交通方式为自己租车"}
        
        const CardExampleExpandable = () => (
            <Card initiallyExpanded={true}>
                <CardHeader
                    title={title}
                    titleStyle={{fontSize: 'large'}}
                    subtitle="具体选择如下"
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                <CardText expandable={true} >
                    <List>
                        <ListItem
                            primaryText="医院与医生"
                            secondaryText={medical}
                            secondaryTextLines={2}
                            />
                        <ListItem
                            primaryText="食宿与交通"
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
        )
        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
                <Stepper activeStep={this.props.stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>选择医院与生产方式</StepLabel>
                        <StepContent>
                            <Hospital/>
                            {this.renderStepActions(0) }
                        </StepContent>
                    </Step>
                    <Step>

                        <StepLabel>选择医生</StepLabel>
                        <StepContent>
                            <Doctor/>
                            {this.renderStepActions(1) }
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>逗留时间</StepLabel>
                        <StepContent>
                            <StayDays/>
                            {this.renderStepActions(2) }
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>住宿与生活</StepLabel>
                        <StepContent>
                            <House/>
                            {this.renderStepActions(3) }
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>交通</StepLabel>
                        <StepContent>
                            <Car/>
                            {this.renderStepActions(4) }
                        </StepContent>
                    </Step>
                </Stepper>
                {this.props.finished && (
                    <div style={{ margin: '20px 0' }}>
                        {CardExampleExpandable() }
                    </div>
                ) }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stepIndex: state.stepReducer.stepIndex,
        finished: state.stepReducer.finished,
        stayDays: state.calcReducer.stay_days,
        nextBtnDisable: state.stepReducer.nextBtnDisable,
        total_price: state.calcReducer.total_price,
        choise:state.calcReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        finishAction: () => {
            dispatch(finishAction())
            dispatch(nextAction())
        },
        nextAction: () => {
            dispatch(nextAction())
        },
        prevAction: () => {
            dispatch(prevAction())
        },
        resetAction: () => {
            dispatch(resetAction())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalLinearStepper)