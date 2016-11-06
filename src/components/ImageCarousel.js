import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as UTIL from '../services/util'
import SwipeableViews from 'react-swipeable-views'

class ImageCarousel extends Component {

    render() {
       
        const images = this.props.hospitalDetail? this.props.hospitalDetail.images.map((item) => {
            return (
                <div key={item}>
                    <img src={item} alt={this.props.hospitalDetail.hospital_cn} />
                </div>
            )
        }): ''
        return (
            <SwipeableViews>
               {images}
            </SwipeableViews>
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