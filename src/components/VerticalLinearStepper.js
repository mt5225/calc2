import React from 'react'
import { connect } from 'react-redux'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentHome from 'material-ui/svg-icons/action/home'
import Hospital from './Hospital'
import Doctor from './Doctor'
import SliderSelectDays from './SliderSelectDays'
import House from './House'
import Car from './Car'
import Result from './Result'
import { nextActionVerify, prevAction, snackBarCloseAction, resetAction } from '../actions'
import { push } from 'react-router-redux'
import ImageCarousel from './ImageCarousel'
import { darkBlack, fullWhite } from 'material-ui/styles/colors'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'

class VerticalLinearStepper extends React.Component {
    constructor(props) {
        super(props);

        this.renderStepActions = (step) => {
            return (
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
                </MuiThemeProvider>
            );
        }
    }

    componentWillMount() {
        if (this.props.redirect === false) {
            console.log('redirct to hospital list')
            this.props.dispatch(push('/'))
        }
    }

    componentDidMount() {
        window.onpopstate = this.props.onBackButtonEvent
    }


    render() {
        const styles = {
            homeButton: {
                marginRight: 20,
                position: 'absolute',
                top: 240,
                right: -12,
                zIndex: 1,
            },
            carousel: {
                width: '100%',
                margin: 0,
            },
            main: {
                backgroundColor: darkBlack,
                position: 'relative'
            },
            text: {
                color: fullWhite,
            },
            buttom: {
                height: 1,
                width: '100%',
            },
        }
        return (
            <div style={styles.main}>
                <div style={styles.carousel}>
                    <ImageCarousel />
                </div>
                <div style={styles.homeButton} >
                    <FloatingActionButton                       
                        mini={true}
                        onClick={this.props.homeAction}>
                        <ContentHome color={fullWhite}/>
                    </FloatingActionButton>
                </div>
                <div>
                    <Stepper activeStep={this.props.stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel style={styles.text}>选择生产方式</StepLabel>
                            <StepContent>
                                <Hospital />
                                {this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>

                            <StepLabel style={styles.text}>选择产科医生</StepLabel>
                            <StepContent>
                                <Doctor />
                                {this.renderStepActions(1)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel style={styles.text}>预计在美逗留时间</StepLabel>
                            <StepContent>
                                <SliderSelectDays />
                                {this.renderStepActions(2)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel style={styles.text}>住宿与生活</StepLabel>
                            <StepContent>
                                <House />
                                {this.renderStepActions(3)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel style={styles.text}>交通</StepLabel>
                            <StepContent>
                                <Car />
                                {this.renderStepActions(4)}
                            </StepContent>
                        </Step>
                    </Stepper>
                </div>
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
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Paper style={styles.buttom} zDepth={1} />
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stepIndex: state.stepReducer.stepIndex,
        finished: state.stepReducer.finished,
        snackBarState: state.validateReducer,
        redirect: state.uiReducer.redirect,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        nextAction: () => {
            dispatch(nextActionVerify())
        },
        prevAction: () => {
            dispatch(prevAction())
        },
        snackBarCloseAction: () => {
            dispatch(snackBarCloseAction())
        },
        homeAction: () => {
            dispatch(resetAction())
            dispatch(push('/'))
        },
        onBackButtonEvent: (e) => {
            console.log('handling back button press')
            e.preventDefault()
            dispatch(resetAction())
            dispatch(push('/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalLinearStepper)