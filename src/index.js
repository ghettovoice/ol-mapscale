/**
 * This file is part of ol-mapscale package.
 * @module ol-mapscale
 * @author Vladimir Vershinin
 */
import Control from './control'
import './styles/main.scss'
// for backward compatibility
if (typeof window !== 'undefined' && window.ol) {
  window.ol.control.MapScale = Control
}

export default Control
