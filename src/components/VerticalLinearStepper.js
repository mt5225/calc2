import React from 'react';
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

class VerticalLinearStepper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            finished: false,
            stepIndex: 0,
        };

        this.handleNext = () => {
            const {stepIndex} = this.state;
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 4,
            });
        };

        this.handlePrev = () => {
            const {stepIndex} = this.state;
            if (stepIndex > 0) {
                this.setState({ stepIndex: stepIndex - 1 });
            }
        };

        this.renderStepActions = (step) => {
            const {stepIndex} = this.state;

            return (
                <div style={{ margin: '12px 0' }}>
                    <RaisedButton
                        label={stepIndex === 4 ? '完 成' : '下一步'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onTouchTap={this.handleNext}
                        style={{ marginRight: 12 }}
                        />
                    {step > 0 && (
                        <FlatButton
                            label="上一步"
                            disabled={stepIndex === 0}
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            onTouchTap={this.handlePrev}
                            />
                    ) }
                </div>
            );
        }
    }


    render() {
        const {finished, stepIndex} = this.state;

        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
                <Stepper activeStep={stepIndex} orientation="vertical">
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
                {finished && (
                    <div style={{ margin: '20px 0', textAlign: 'center' }}>
                        <FlatButton label="重头开始" primary={true} onClick={(event) => {
                            event.preventDefault();
                            this.setState({ stepIndex: 0, finished: false });
                        } }/>
                    </div>
                ) }
            </div>
        );
    }
}

export default VerticalLinearStepper;