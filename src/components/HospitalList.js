import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { connect } from 'react-redux'
import { hospitalItemSelectedAction, fetchHospitalRecordAction } from '../actions'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class HospitalList extends Component {
    componentDidMount() {
        this.props.dispatch(fetchHospitalRecordAction())
    }
    render() {
        const styles = {
            title: {
                height: '100%',
                width: '100%',
                margin: 0,          
                display: 'block',           
            },
            headText: {
                textAlign: 'center',
                paddingTop: 5,
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
                                <img src={item.main_image} />
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
                        <p style={styles.headText}>赴美生子 - 洛杉矶医院排名</p>
                    </Paper>
                    <div>
                        {listItem}
                    </div>
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