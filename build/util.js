const fs = require('fs-extra')
const path = require('path')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')
const sass = require('rollup-plugin-sass')
const postcss = require('postcss')
const postcssrc = require('postcss-load-config')
const cssnano = require('cssnano')
const concat = require('source-map-concat')

function plugins (options = {}) {
  const plugins = [
    replace(options.replace),
    ...(
      options.sass
        ? [sassPlugin(Object.assign({min: options.min}, options.sass))]
        : []
    ),
    babel({
      runtimeHelpers: true,
      sourceMap: true,
      include: [
        'src/**/*',
      ],
    }),
    resolve({
      main: true,
      module: true,
      jsnext: true,
      browser: true,
    }),
    cjs(),
  ]
  if (options.min) {
    plugins.push(uglify({
      mangle: true,
      sourceMap: true,
      compress: {
        warnings: false,
      },
      output: {
        comments: (node, comment) => {
          let text = comment.value
          let type = comment.type
          if (type === 'comment2') {
            // multiline comment
            return /@preserve|@license|@cc_on/i.test(text)
          }
        },
      },
    }))
  }
  return plugins
}

function sassPlugin (options = {}) {
  return sass({
    processor: (css, id) => {
      return postcssrc()
        .then(({plugins, postcssOptions}) => {
          if (options.min) {
            plugins.push(cssnano())
          }

          return postcss(plugins)
            .process(css, Object.assign({}, postcssOptions, {
              from: id,
              to: options.outPath,
              map: {inline: false},
            }))
        })
        .then(({css, map}) => ({css, map: map.toJSON()}))
    },
    output: (styles, styleNodes) => {
      const files = styleNodes.map(node => ({
        sourcesRelativeTo: options.outPath,
        code: node.content.css,
        map: node.content.map,
      }))
      const { code, map } = concatFiles(files, options.outPath, options.banner || '')
      fs.outputFileSync(options.outPath, code)
      fs.outputFileSync(options.outPath + '.map', map)
    },
    options: {
      sourceMap: true,
      includePaths: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../node_modules'),
      ],
    },
  })
}

function concatFiles (files, dest, banner) {
  const concatenated = concat(files, {
    delimiter: '\n',
    mapPath: dest + '.map',
  })

  if (banner) {
    concatenated.prepend(banner + '\n')
  }

  const { code, map } = concatenated.toStringWithSourceMap({
    file: path.basename(dest),
  })

  return {
    id: dest,
    code: code,
    map: map.toString(),
  }
}

module.exports = {
  plugins,
  sassPlugin,
  concatFiles,
}
