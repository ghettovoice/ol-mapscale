[![Build Status](https://travis-ci.org/ghettovoice/ol-mapscale.svg?branch=master)](https://travis-ci.org/ghettovoice/ol-mapscale)
[![view on npm](http://img.shields.io/npm/v/ol-mapscale.svg)](https://www.npmjs.org/package/ol-mapscale)
[![License](https://img.shields.io/github/license/ghettovoice/ol-mapscale.svg)](https://github.com/ghettovoice/ol-mapscale/blob/master/LICENSE)

# Map scale control with scale string for OpenLayers

Adds custom control to [OpenLayers](https://openlayers.org/) map. Shows scale line and scale string.

## Installation

Install it thought NPM or Bower:

```shell
# ES6 version for bundling with Webpack, Rollup or etc.
npm install ol ol-mapscale
# to use UMD version 'openlayers' package should be installed
npm install openlayers
```

Or add from CDN:

```html
<script src="https://unpkg.com/openlayers@latest/dist/ol.js"></script>
<script src="https://unpkg.com/ol-mapscale@latest/dist/bundle.min.js"></script>
```

### Note
**Plugin is available in 2 versions: as UMD module and as ES2015 module:**
- **RECOMMENDED: ES2015 version (`dist/bundle.es.js`) should be used with [ol](https://www.npmjs.com/package/ol) package (you should
  install it manually).**
- **UMD version (`dist/bundle[.min].js`) should be used with [openlayers](https://www.npmjs.com/package/openlayers) package.
  You can install `ol` package as dev dependency to suppress NPM warning about required peer dependencies.**

## Usage

Plugin may be used as UMD module or ES2015 module:

```js
// Use as ES2015 module (based on NPM package `ol`)
import Map from 'ol/map'
...
import MapScaleControl from 'ol-mapscale'

// Use as UMD module (based on NPM package `openlayers`)
const ol = require('openlayers')
...
const MapScaleControl = require('ol-mapscale')
```

In Browser environment you should add **script** tag pointing to UMD module after OpenLayers js files.
```html
<script src="https://unpkg.com/openlayers@latest/dist/ol.js"></script>
<script src="https://unpkg.com/ol-mapscale@latest/dist/bundle.min.js"></script>
<script>
  // plugin exports global variable MapScaleControl
  // in addition it also exported to `ol.control.MapScale` field (for backward compatibility).
</script>
```

### Options

| Option              | Type                                      | Description                                                                            |
|:--------------------|:------------------------------------------|:---------------------------------------------------------------------------------------|
| target              | _Element &#124; string &#124; undefined_  | Specify a target if you want the control to be rendered outside of the map's viewport. |
| className           | _string &#124; string[] &#124; undefined_ | Custom class name of the control container element. Default is `ol-mapscale`.          |
| scaleLineClassName  | _string &#124; string[] &#124; undefined_ | Custom class name of the scale line container element. Default is `ol-scale-line`.     |
| scaleValueClassName | _string &#124; string[] &#124; undefined_ | Custom class name of the scale value container element. Default is `ol-scale-value`.   |
| scaleLine           | _boolean &#124; undefined_                | Show/hide scale line control. Default is `true`.                                       |
| units               | _string[] &#124; undefined_               | Array of scale value units. Default is `['k', 'M', 'G']`.                              |
| digits              | _number &#124; undefined_                 | The number of digits to appear after the decimal point. Default is `0`.                |

### Example usage:
```js
import Map from 'ol/map'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import OSMSource from 'ol/source/osm'
import 'ol/ol.css'
import MapScaleControl from 'ol-mapscale'

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
```

## License

MIT (c) 2016-2018, Vladimir Vershinin
