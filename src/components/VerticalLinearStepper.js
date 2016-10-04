import React from 'react';
import { connect } from 'react-redux'
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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
                        onTouchTap={this.props.nextAction}
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
                    <div style={{ margin: '20px 0', textAlign: 'center' }}>
                        <FlatButton label="重头开始" primary={true} onClick={(event) => {
                            event.preventDefault()
                            this.props.resetAction()
                        } }/>
                    </div>
                ) }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        calc_result: state.calcReducer.calc_result,
        stepIndex: state.stepReducer.stepIndex,
        finished: state.stepReducer.finished,
        stayDays: state.calcReducer.stay_days,
        nextBtnDisable: state.stepReducer.nextBtnDisable,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        calcResult: () => {
            dispatch(finishAction())
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