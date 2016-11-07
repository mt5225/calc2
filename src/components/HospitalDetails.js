import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class HospitalDetails extends Component {

    render() {
        let hospital_detail = ''
        const styles = {
            td: {
                whiteSpace: 'normal',
                wordWrap: 'break-word'
            },
            table: {
                textAlign: 'left'
            }
        }


        if (this.props.detail) {
            const price = (
                <div>
                    <p> {'顺产: ' + this.props.detail.price.normal} </p>
                    <p> {'剖腹产: ' + this.props.detail.price.csection} </p>
                </div>)

            hospital_detail = (
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Table style={styles.table}>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            <TableRow>
                                <TableRowColumn> 英文名</TableRowColumn>
                                <TableRowColumn colSpan={5} style={styles.td}>{this.props.detail.hospital}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn> 中文名</TableRowColumn>
                                <TableRowColumn colSpan={5} style={styles.td}>{this.props.detail.hospital_cn}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>简介</TableRowColumn>
                                <TableRowColumn colSpan={5} style={styles.td}>{this.props.detail.description}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>地址</TableRowColumn>
                                <TableRowColumn colSpan={5} style={styles.td}>{this.props.detail.address}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn >等级</TableRowColumn>
                                <TableRowColumn colSpan={5} style={styles.td}>{this.props.detail.level}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn colSpan={3}>高风险孕妇服务</TableRowColumn>
                                <TableRowColumn colSpan={2} style={styles.td}>{this.props.detail.high_risk_service}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn> 评分</TableRowColumn>
                                <TableRowColumn colSpan={5} style={styles.td}>{this.props.detail.rating === 0 ?
                                    '没有评分不进入排名' :
                                    this.props.detail.rating}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>网址</TableRowColumn>
                                <TableRowColumn colSpan={5} style={styles.td}>{this.props.detail.website}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>收费</TableRowColumn>
                                <TableRowColumn colSpan={5} style={styles.td}>{price}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </MuiThemeProvider>
            )
        }

        return (
            <div>
                <Paper style={this.props.style} zDepth={1} rounded={false}>
                    {hospital_detail}
                </Paper>
            </div>
        );
    }
}

HospitalDetails.propTypes = {
    detail: PropTypes.object,
    style: PropTypes.object.isRequired,
};

export default HospitalDetails