/**
 * This file is part of ol-mapscale package.
 * @module ol-mapscale
 * @author Vladimir Vershinin
 */

/**
 * @param {string} tagName
 * @param {string|string[]} [classes]
 * @returns {Element}
 */
export function createElement (tagName, classes) {
  const elem = document.createElement(tagName)

  if (classes) {
    elem.classList.add.apply(elem.classList, typeof classes === 'string' ? classes.split(' ') : classes)
  }

  return elem
}

/**
 * Calculates screen DPI based on css style.
 *
 * @returns {number|undefined}
 */
export function calculateDPI () {
  if (!document) {
    return
  }

  const inch = document.createElement('div')

  inch.style.width = '1in'
  inch.style.height = '1in'
  inch.style.position = 'fixed'
  inch.style.left = '-100%'

  document.body.appendChild(inch)

  let dpi = inch.offsetWidth
  document.body.removeChild(inch)

  return dpi
}

/**
 * Formats number.
 *
 * @param {number} num
 * @param {number} digits
 * @param {string[]} units
 * @returns {string}
 */
export function formatNumber (num, digits = 0, units = ['k', 'M', 'G']) {
  for (var i = units.length - 1; i >= 0; i--) {
    const decimal = Math.pow(1000, i + 1)

    if (num <= -decimal || num >= decimal) {
      return parseFloat(num / decimal).toFixed(digits) + units[i]
    }
  }

  return num
}
