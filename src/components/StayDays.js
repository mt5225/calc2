import React, {Component} from 'react';
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import { daysAction } from '../actions'

class StayDays extends Component {
    render() {
        return (
            <div>
             <br/>
                <TextField
                    onChange={this.props.daysQ}
                    value={this.props.stay_days}
                    hintText="估计在美停留天数"
                    />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stay_days: state.calcReducer.stay_days
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        daysQ: (e) => {
            let payload = {
                value: e.target.value
            }
            dispatch(daysAction(payload))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StayDays)