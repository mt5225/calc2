import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import * as L from 'leaflet'
import * as UTIL from '../services/util'
import { connect } from 'react-redux'

class HospitalMap extends React.Component {
    render() {
        const position = UTIL.strToCoordinate(this.props.record.geo)
        const myIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
            iconSize: [14, 22],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [19, 22],
        });
        return (
            <Map center={position} zoom={10}>
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                <Marker
                    position={UTIL.strToCoordinate(this.props.record.geo)}
                    icon={myIcon}
                    id={this.props.record.id}>
                    <Popup closeButton={false}>
                        <span>
                            {this.props.record.hospital}
                            <br />
                            {this.props.record.hospital_cn}
                            <br />
                            { '地址：' + this.props.record.address}
                        </span>
                    </Popup>
                </Marker>
            </Map>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        record: UTIL.getHospitalDetailByName(
            state.calcReducer.hospital_name,
            state.dataReducer.records)
    }
}

export default connect(mapStateToProps, null)(HospitalMap)


