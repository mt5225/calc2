import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as UTIL from '../services/util'
import autoPlay from 'react-swipeable-views/lib/autoPlay'
import SwipeableViews from 'react-swipeable-views'
import virtualize from 'react-swipeable-views/lib/virtualize'


const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews))

class ImageCarousel extends Component {
    state = {
        index: 0,
    }

    handleChangeIndex = (index) => {
        this.setState({
            index
        })
    }

    slideRenderer = (params) => {
        const {
            index,
            key,
        } = params
        if (this.props.hospitalDetail) {
            const modNumber = this.props.hospitalDetail.images.length
            return (
                <img src={this.props.hospitalDetail.images[UTIL.mod(index, modNumber)]}
                    key={key} alt={this.props.hospitalDetail.hospital_cn} />
            )
        } else {
            return ('')
        }


    }
    render() {

        return (
            <AutoPlaySwipeableViews
                index={this.state.index}
                onChangeIndex={this.handleChangeIndex}
                slideRenderer={this.slideRenderer}>
            </AutoPlaySwipeableViews>
        )
    }
}

const mapStateToProps = (state) => {
    const records = state.dataReducer.records
    return {
        imageArray: state.uiReducer.redirect,
        hospitalDetail: UTIL.getHospitalDetailByName(state.calcReducer.hospital_name,
            records),
    }
}


export default connect(mapStateToProps, null)(ImageCarousel)