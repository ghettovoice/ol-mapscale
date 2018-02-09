import Map from 'ol/map'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import OSMSource from 'ol/source/osm'
import 'ol/ol.css'
import MapScaleControl from '../src'

const map = new Map({
  target: 'map',
  view: new View({
    center: [4189972.14, 7507950.67],
    zoom: 5,
  }),
  layers: [
    new TileLayer({
      source: new OSMSource(),
    }),
  ],
})

map.addControl(new MapScaleControl())
