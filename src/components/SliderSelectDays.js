import React, {Component} from 'react'
import Slider from 'material-ui/Slider'
import { connect } from 'react-redux'
import { daysAction } from '../actions'
import { fullWhite } from 'material-ui/styles/colors'

class SliderSelectDays extends Component {

    render() {
        const text = {
            color: fullWhite
        }
        return (
            <div className={'row'}>
            <div className={'col-xs-9'}>
                <Slider
                    min={30}
                    max={180}
                    step={1}
                    defaultValue={90}
                    value={this.props.days}
                    onChange={this.props.daysQ}
                    />
                    </div>
                    <div className={'col-xs-3'}>
                <p style={text}>
                    {this.props.days} 天
                </p>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        days: state.calcReducer.stay_days
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        daysQ: (e, value) => {
            let payload = {
                value: value
            }
            dispatch(daysAction(payload))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderSelectDays)