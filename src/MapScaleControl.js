//@flow
import ol from "openlayers";
import { createElement, calculateDPI, formatNumber } from './util';

/**
 * @typedef {Object} MapScaleControlOptions
 * @property {Element | string | undefined} target Specify a target if you want the control to be rendered outside of the map's viewport.
 * @property {string | string[] | undefined} className Custom class name of the control container element. Default is `ol-mapscale`.
 * @property {string | string[] | undefined} scaleLineClassName Custom class name of the scale line container element. Default is `ol-scale-line`.
 * @property {string | string[] | undefined} scaleValueClassName Custom class name of the scale value container element. Default is `ol-scale-value`.
 * @property {boolean | undefined} scaleLine Show/hide scale line control. Default is true.
 * @property {string[] | undefined} units Array of scale value units. Default is `['k', 'M', 'G']`.
 * @property {number | undefined} digits The number of digits to appear after the decimal point. Default is 0.
 */
var MapScaleControlOptions;

const DOTS_PER_INCH = 96;
const INCHES_PER_METER = 39.37;

/**
 * MapScale control class.
 *
 * @class
 * @extends {ol.control.Control}
 * @author Vladimir Vershinin
 */
export default class MapScaleControl extends ol.control.Control {
    /**
     * @param {MapScaleControlOptions} options
     */
    constructor(options = {}) {
        const className = options.className || 'ol-mapscale';
        const scaleLineClassName = options.scaleLineClassName || "ol-scale-line";
        const scaleValueClassName = options.scaleLineClassName || "ol-scale-value";
        const render = MapScaleControl.render;
        const target = options.target;

        const element = createElement('div', className);

        super({
            element,
            render,
            target
        });
        /**
         * @type {string[]}
         * @private
         */
        this.units_ = options.units;
        /**
         * @type {number}
         * @private
         */
        this.digits_ = options.digits;
        /**
         * @type {Element}
         * @private
         */
        this.scaleValueElement_ = createElement('div', scaleValueClassName);
        element.appendChild(this.scaleValueElement_);

        /**
         * @private
         * @type {olx.ViewState}
         */
        this.viewState_ = undefined;

        /**
         * @type {ol.control.ScaleLine}
         * @protected
         */
        this.scaleLine_ = undefined;
        if (options.scaleLine === undefined || options.scaleLine) {
            const scaleLineElement = createElement('div', 'ol-scale-line-target');
            element.appendChild(scaleLineElement);

            this.scaleLine_ = new ol.control.ScaleLine({
                target: scaleLineElement,
                className: scaleLineClassName
            });

            this.scaleLine_.on("change:units", ::this.handleUnitsChanged_);
        }
    }

    /**
     * @param {ol.MapEvent} mapEvent
     * @this {MapScaleControl}
     */
    static render(mapEvent) {
        const frameState = mapEvent.frameState;

        if (frameState == null) {
            this.viewState_ = null;
        } else {
            this.viewState_ = frameState.viewState;
        }

        this.updateElement_();
    }

    /**
     * @param {ol.Map} map
     */
    setMap(map) {
        this.scaleLine_ && this.scaleLine_.setMap(map);
        super.setMap(map);
    }

    /**
     * @private
     */
    handleUnitsChanged_() {
        this.updateElement_();
    }

    /**
     * @private
     */
    updateElement_() {
        const viewState = this.viewState_;

        if (viewState) {
            const resolution = viewState.resolution;
            const projection = viewState.projection;
            const pointResolution = projection.getMetersPerUnit() * resolution;
            const scale = Math.round(pointResolution * DOTS_PER_INCH * INCHES_PER_METER);

            this.scaleValueElement_.innerHTML = "1 : " + formatNumber(scale, this.digits_, this.units_);
        }
    }
}
