import React, { Component } from 'react'
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet'

class WMSMap extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    };

    onClick = () => {
        this.setState({
          bluemarble: !this.state.bluemarble,
      })
    }

    render () {
        return (
            <Map
                center={[this.state.lat, this.state.lng]}
                zoom={this.state.zoom}
                onClick={this.onClick}>
                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <WMSTileLayer
                    layers={this.state.bluemarble ? 'nasa:bluemarble' : 'ne:ne'}
                    url='http://demo.opengeo.org/geoserver/ows?'
                />
            </Map>
          )
    }
}

export default WMSMap