import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { darkBlack } from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { mediacalData } from '../services/dataService'
import { connect } from 'react-redux'
import { hospitalItemSelectedAction } from '../actions'

class HospitalList extends Component {
    render() {
        const styles = {
            title: {
                textAlign: 'center'
            }
        }
        const listItem = mediacalData.map(
            (item) => {
                return (<ListItem
                    key={item.id}
                    value={item.hospital}
                    primaryText={item.hospital}
                    onTouchTap={this.props.selectHospital.bind(this, item.hospital)}
                    leftAvatar={(<Avatar src={"images/" + item.id + ".png"} />)}
                    secondaryTextLines={2}
                    secondaryText={
                        <p>
                            <span style={{ color: darkBlack }}>{item.hospital_cn}</span> &nbsp;
                     {item.rating === 'N/A' ? "没有评分不进入排名" : "产科综合评分:" + item.rating}
                        </p>
                    }
                    />
                )
            }
        )
        return (
            <MuiThemeProvider>
                <div>
                    <h3 style={styles.title}>赴美生子 - 洛杉矶医院排名</h3>
                    <List>
                        {listItem}
                    </List>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        redirect: state.uiReducer.redirect
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