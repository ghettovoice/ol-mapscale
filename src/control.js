/**
 * This file is part of ol-mapscale package.
 * @module ol-mapscale
 * @author Vladimir Vershinin
 */
import Control from 'ol/control/control'
import ScaleLineControl from 'ol/control/scaleline'
import { createElement, formatNumber } from './util'

const DOTS_PER_INCH = 96
const INCHES_PER_METER = 39.37

/**
 * MapScale control class.
 *
 * @class
 * @extends {ol.control.Control}
 * @author Vladimir Vershinin
 */
export default class MapScaleControl extends Control {
  /**
   * @param {MapScaleControlOptions} options
   */
  constructor (options = {}) {
    const className = options.className || 'ol-mapscale'
    const scaleLineClassName = options.scaleLineClassName || 'ol-scale-line'
    const scaleValueClassName = options.scaleLineClassName || 'ol-scale-value'
    const render = MapScaleControl.render
    const target = options.target

    const element = createElement('div', className)

    super({
      element,
      render,
      target,
    })
    /**
     * @type {string[]}
     * @private
     */
    this.units_ = options.units
    /**
     * @type {number}
     * @private
     */
    this.digits_ = options.digits
    /**
     * @type {Element}
     * @private
     */
    this.scaleValueElement_ = createElement('div', scaleValueClassName)
    element.appendChild(this.scaleValueElement_)

    /**
     * @private
     * @type {olx.ViewState}
     */
    this.viewState_ = undefined

    /**
     * @type {ol.control.ScaleLine}
     * @protected
     */
    this.scaleLine_ = undefined
    if (typeof options.scaleLine === 'undefined' || options.scaleLine) {
      const scaleLineElement = createElement('div', 'ol-scale-line-target')
      element.appendChild(scaleLineElement)

      this.scaleLine_ = new ScaleLineControl({
        target: scaleLineElement,
        className: scaleLineClassName,
      })

      this.scaleLine_.on('change:units', ::this.handleUnitsChanged_)
    }
  }

  /**
   * @param {ol.MapEvent} mapEvent
   * @this {MapScaleControl}
   */
  static render (mapEvent) {
    const frameState = mapEvent.frameState

    if (frameState == null) {
      this.viewState_ = null
    } else {
      this.viewState_ = frameState.viewState
    }

    this.updateElement_()
  }

  /**
   * @param {ol.Map} map
   */
  setMap (map) {
    this.scaleLine_ && this.scaleLine_.setMap(map)
    super.setMap(map)
  }

  /**
   * @private
   */
  handleUnitsChanged_ () {
    this.updateElement_()
  }

  /**
   * @private
   */
  updateElement_ () {
    const viewState = this.viewState_

    if (viewState) {
      const resolution = viewState.resolution
      const projection = viewState.projection
      const pointResolution = projection.getMetersPerUnit() * resolution
      const scale = Math.round(pointResolution * DOTS_PER_INCH * INCHES_PER_METER)

      this.scaleValueElement_.innerHTML = '1 : ' + formatNumber(scale, this.digits_, this.units_)
    }
  }
}
