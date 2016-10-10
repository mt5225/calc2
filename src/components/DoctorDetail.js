import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'

class DoctorDetail extends Component {

    render() {
        const styles = {
            td: {
                whiteSpace: 'normal',
                wordWrap: 'break-word'
            },
            table: {
                textAlign: 'left'
            }
        }
        let doctor_detail = ''
        console.log(this.props.doctor)
        if (this.props.doctor) {
            let price = "顺产" +
                this.props.doctor.price_normal +
                ", 剖腹产" +
                this.props.doctor.csection

            doctor_detail = (
                <Table style={styles.table}>
                    <TableBody displayRowCheckbox={false} stripedRows={true}>
                        <TableRow>
                            <TableRowColumn>性别</TableRowColumn>
                            <TableRowColumn colSpan={3} style={styles.td}>{this.props.doctor.sex}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>会国语</TableRowColumn>
                            <TableRowColumn colSpan={3} style={styles.td}>{this.props.doctor.speak_cn}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>中文助理</TableRowColumn>
                            <TableRowColumn colSpan={3} style={styles.td}>{this.props.doctor.has_cn_assistant}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>诊所地址</TableRowColumn>
                            <TableRowColumn colSpan={3} style={styles.td}>{this.props.doctor.address}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>合作医院</TableRowColumn>
                            <TableRowColumn colSpan={3} style={styles.td}>{this.props.doctor.hospital}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>报价</TableRowColumn>
                            <TableRowColumn colSpan={3} style={styles.td}>{price}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            )
        }
        return (
            <div>
                <Paper style={this.props.style} zDepth={1} rounded={false}>
                    {doctor_detail}
                </Paper>
            </div>
        );
    }
}

DoctorDetail.propTypes = {
    doctor: PropTypes.object,
    style: PropTypes.object.isRequired,
};

export default DoctorDetail