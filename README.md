[![Build Status](https://travis-ci.org/ghettovoice/ol3-mapscale.svg?branch=master)](https://travis-ci.org/ghettovoice/ol3-mapscale)
[![view on npm](http://img.shields.io/npm/v/ol3-mapscale.svg)](https://www.npmjs.org/package/ol3-mapscale)

# Map scale control with scale string for OpenLayer 3

Adds custom control to [ol3](https://github.com/openlayers/ol3) map. Shows scale line and scale string.

## Installation

Install it thought NPM:

```shell
npm install ol3-mapscale
```

Or download the latest version archive and add it with script tag:

```html
<script src="ol3-mapscale/dist/bundle.min.js"></script>
```

## Usage

Plugin is packed into UMD wrapper, import it with CommonJS or ES6:

```js
import MapScaleControl from 'ol3-mapscale';
const MapScaleControl = require('ol3-mapscale');
```

In Browser environment it is available as `ol.control.MapScale`.

### Options

| Option              | Type                                      | Description                                                                            |
|:--------------------|:------------------------------------------|:---------------------------------------------------------------------------------------|
| target              | _Element &#124; string &#124; undefined_  | Specify a target if you want the control to be rendered outside of the map's viewport. |
| className           | _string &#124; string[] &#124; undefined_ | Custom class name of the control container element. Default is `ol-mapscale`.          |
| scaleLineClassName  | _string &#124; string[] &#124; undefined_ | Custom class name of the scale line container element. Default is `ol-scale-line`.     |
| scaleValueClassName | _string &#124; string[] &#124; undefined_ | Custom class name of the scale value container element. Default is `ol-scale-value`.   |
| scaleLine           | _boolean &#124; undefined_                | Show/hide scale line control. Default is true.                                         |
| units               | _string[] &#124; undefined_               | Array of scale value units. Default is `['k', 'M', 'G']`.                              |
| digits              | _number &#124; undefined_                 | The number of digits to appear after the decimal point. Default is 0.                               |

### Example usage:
```js
const map = new ol.Map({
    target: 'map',
    view: new ol.View({
        projectoin: 'EPSG:3857',
        center: [4189972.14, 7507950.67],
        zoom: 5
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({ layer: 'osm' })
        })
    ]
});

map.addControl(new ol.control.MapScale());
```
