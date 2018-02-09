/* global describe, it, expect, sinon, beforeEach, afterEach */
import Map from 'ol/map'
import View from 'ol/view'

const map = new Map({
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
  interactions: [], // remove all interactions to disable animations
  layers: [],
})

describe('MapScale control', function () {
  describe('Test add control', function (done) {
    const mapScaleControl = new ol.control.MapScale()
    map.addControl(mapScaleControl)

    expect(map.getControls().getArray().indexOf(mapScaleControl)).to.be.equal(-1)

    const elem = document.querySelector('.ol-mapscale')
    // todo figure out how to get rid of callback hell
    setTimeout(function () {
      expect(elem).to.not.be.undefined
      expect(elem.querySelector('.ol-scale-value').textContent).to.be.equal('1 : 148M')

      map.getView().setZoom(10)
      setTimeout(function () {
        expect(elem.querySelector('.ol-scale-value').textContent).to.be.equal('1 : 578k')

        map.getView().setZoom(20)
        setTimeout(function () {
          expect(elem.querySelector('.ol-scale-value').textContent).to.be.equal('1 : 564')
          done()
        }, 100)
      }, 100)
    }, 100)
  })
})
