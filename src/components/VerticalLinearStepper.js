import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Hospital from './Hospital'

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
                finished: stepIndex >= 2,
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
                        label={stepIndex === 2 ? '完 成' : '下一步'}
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

        const styles = {
                block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 16,
            },
        };

        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>请选择医院与生产方式</StepLabel>
                        <StepContent>
                            <Hospital/>
                            {this.renderStepActions(0) }
                        </StepContent>
                    </Step>
                    <Step>

                        <StepLabel>选择医院与医生</StepLabel>
                        <StepContent>
                                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                    <RadioButton
                                     value="light"
                                     label="医院A"
                                     style={styles.radioButton}
                                      />
                                    <RadioButton
                                    value="not_light"
                                    label="医院B" 
                                    style={styles.radioButton}
                                    />

                                 </RadioButtonGroup>
                            {this.renderStepActions(1) }
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad</StepLabel>
                        <StepContent>
                            <p>
                                Try out different ad text to see what brings in the most customers,
                                and learn how to enhance your ads using features like ad extensions.
                                If you run into any problems with your ads, find out how to tell if
                                they're running and how to resolve approval issues.
                            </p>
                            {this.renderStepActions(2) }
                        </StepContent>
                    </Step>
                </Stepper>
                {finished && (
                    <p style={{ margin: '20px 0', textAlign: 'center' }}>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({ stepIndex: 0, finished: false });
                            } }
                            >
                            Click here
                        </a> to reset the example.
                    </p>
                ) }
            </div>
        );
    }
}

export default VerticalLinearStepper;