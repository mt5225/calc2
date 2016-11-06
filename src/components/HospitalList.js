import React, { Component } from 'react'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { connect } from 'react-redux'
import { hospitalItemSelectedAction, fetchHospitalRecordAction } from '../actions'
import Paper from 'material-ui/Paper'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { fullWhite } from 'material-ui/styles/colors'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'

const nearbyIcon = <IconLocationOn />;

class HospitalList extends Component {
    componentDidMount() {
        this.props.dispatch(fetchHospitalRecordAction())
    }
    render() {
        const styles = {
            headText: {
                textAlign: 'center',
                color: fullWhite,
                margin: 0,
                paddingTop: 15,
                paddingLeft: 8,
                fontSize: 18
            }
        }

        let listItem = ''
        if (this.props.data.ifReady) {
            listItem = this.props.data.records.map(
                (item) => {
                    let detail = item.hospital + '\t'
                    detail += item.rating === 0 ?
                        "没有评分不进入排名" : "产科综合评分:" + item.rating
                    return (
                        <Card key={item.id}
                            onTouchTap={this.props.selectHospital.bind(this, item.hospital)}>
                            <CardMedia
                                overlay={<CardTitle title={item.hospital_cn} subtitle={detail} />}
                                >
                                <img src={item.main_image} alt={item.hospital} />
                            </CardMedia>
                        </Card>
                    )
                }
            )
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                    <Paper style={styles.title} zDepth={1}>
                        <BottomNavigation>
                            <p style={styles.headText}>赴美生子 - 洛杉矶医院排名</p>                           
                            <BottomNavigationItem
                                label="Map"
                                icon={nearbyIcon}
                                onTouchTap={() => {}}
                                />
                        </BottomNavigation>
                    </Paper>
                    {listItem}
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        redirect: state.uiReducer.redirect,
        data: state.dataReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        selectHospital: (name) => {
            let payload = {
                value: name
            }
            dispatch(hospitalItemSelectedAction(payload))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalList)