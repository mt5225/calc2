import React from 'react'
import { connect } from 'react-redux'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import Hospital from './Hospital'
import Doctor from './Doctor'
import SliderSelectDays from './SliderSelectDays'
import House from './House'
import Car from './Car'
import Result from './Result'
import { nextActionVerify, prevAction,snackBarCloseAction } from '../actions'

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
                    )}
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
                            <Hospital />
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>

                        <StepLabel>选择医生</StepLabel>
                        <StepContent>
                            <Doctor />
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>逗留时间</StepLabel>
                        <StepContent>
                            <SliderSelectDays />
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>住宿与生活</StepLabel>
                        <StepContent>
                            <House />
                            {this.renderStepActions(3)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>交通</StepLabel>
                        <StepContent>
                            <Car />
                            {this.renderStepActions(4)}
                        </StepContent>
                    </Step>
                </Stepper>
                {this.props.finished && (
                    <div style={{ margin: '20px 0' }}>
                        <Result />
                    </div>
                )}

                <Snackbar
                    open={this.props.snackBarState.showStepWarning}
                    message={this.props.snackBarState.warningMessage}
                    autoHideDuration={1200}
                    onRequestClose={this.props.snackBarCloseAction}
                    />
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
        choise: state.calcReducer,
        snackBarState: state.validateReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        nextAction: () => {
            dispatch(nextActionVerify())
        },
        prevAction: () => {
            dispatch(prevAction())
        },
        snackBarCloseAction: () => {
            dispatch(snackBarCloseAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalLinearStepper)