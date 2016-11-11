import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import * as L from 'leaflet'
import * as UTIL from '../services/util'
import { connect } from 'react-redux'

class HospitalsMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 34.016423,
      lng: -118.110545,
      zoom: 9,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
      iconSize: [14, 22],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      shadowSize: [19, 22],
    });
    const markers = this.props.ifReady ?
      this.props.hospitals.map((record) => {
        let detail = (<span> {record.hospital} <br />
          {record.hospital_cn} <br />
          {record.rating === 0 ?
            "没有评分不进入排名" : "产科综合评分:" + record.rating} <br />
          {'地址: ' + record.address}
        </span>
        )
        return (
          <Marker position={UTIL.strToCoordinate(record.geo)} icon={myIcon} key={record._id}>
            <Popup closeButton={false}>
              {detail}
            </Popup>
          </Marker>
        )
      }) : ''
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        {markers}
      </Map>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hospitals: state.dataReducer.records,
    ifReady: state.dataReducer.ifReady,
  }
}

export default connect(mapStateToProps, null)(HospitalsMap)


