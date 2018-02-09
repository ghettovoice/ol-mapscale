/* global describe, it, expect, sinon, beforeEach, afterEach */
import Map from 'ol/map'
import View from 'ol/view'
import Control from 'ol/control/control'
import MapScaleControl from '../../../src'

describe('MapScale control', function () {
  let map, mapScaleControl

  beforeEach(done => {
    map = new Map({
      target: createTargetElement(500, 500),
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      interactions: [], // remove all interactions to disable animations
      layers: [],
    })

    map.once('postrender', () => done())
  })
  afterEach(() => {
    map.setTarget(undefined)
    map = mapScaleControl = undefined
  })

  describe('initializing', () => {
    it('should be instance of ol.control.Control', () => {
      mapScaleControl = new MapScaleControl()
      expect(mapScaleControl).to.be.instanceOf(Control)
    })
  })

  describe('when added to map', () => {
    let elem
    beforeEach(done => {
      mapScaleControl = new MapScaleControl()
      map.addControl(mapScaleControl)
      setTimeout(() => {
        elem = document.querySelector('.ol-mapscale')
        done()
      }, 100)
    })
    afterEach(() => {
      elem = undefined
    })

    it('should be present on map', function () {
      expect(map.getControls().getArray()).to.include(mapScaleControl)
    })

    it('should render element', () => {
      expect(elem).to.exists
    })

    it('should have initial value', () => {
      console.log(elem)
      expect(elem.querySelector('.ol-scale-value').textContent).to.be.equal('1 : 148M')
    })

    describe('on zoom changes', () => {
      it('should update value', done => {
        map.getView().setZoom(10)
        setTimeout(() => {
          expect(elem.querySelector('.ol-scale-value').textContent).to.be.equal('1 : 578k')
          done()
        }, 100)
      })
    })
  })
})

function createTargetElement (w, h) {
  let target = document.createElement('div')
  target.setAttribute('id', 'map')
  let style = target.style
  style.width = `${w}px`
  style.height = `${h}px`
  document.body.appendChild(target)

  return target
}
