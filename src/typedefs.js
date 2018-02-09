/**
 * This file is part of ol-mapscale package.
 * @module ol-mapscale
 * @license MIT
 * @author Vladimir Vershinin
 */

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
let MapScaleControlOptions
