const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const packageJson = require('./package.json');

const RELEASE = _.includes(process.argv, '--release');
const BUILD = _.includes(process.argv, '--build');
const DEBUG = !BUILD && !RELEASE;
const VERBOSE = _.includes(process.argv, '--verbose');
const PROFILE = _.includes(process.argv, '--profile');
const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG
};
const AUTOPREFIXER_BROWSERS = [
    'Android >= 4.3',
    'Chrome >= 45',
    'Firefox >= 43',
    'Explorer >= 10',
    'iOS >= 8.4',
    'Opera >= 12',
    'Safari >= 9'
];

const nodeModulesDir = path.join(__dirname, 'node_modules');
const srcDir = path.join(__dirname, 'src');
const outDir = path.join(__dirname, 'dist');
const bundleName = RELEASE ? 'bundle.min' : 'bundle';
const exportName = ['ol', 'control', 'MapScale'];
const entry = path.join(srcDir, 'index.js');

const banner =
`OpenLayers 3 map scale control with scale string.

@package ${packageJson.name}
@author ${packageJson.author}
@version ${packageJson.version}
@licence MIT https://opensource.org/licenses/MIT
         Based on OpenLayers 3. Copyright 2005-2016 OpenLayers Contributors. All rights reserved. http://openlayers.org
@copyright (c) 2016, ${packageJson.author}`;

const plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ProgressBarPlugin({
        format: ' build ' + chalk.magenta.bold('[ol3-mapscale]') + ' ' + chalk.cyan.bold('[:bar]') +
                ' ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new ExtractTextPlugin(`${bundleName}.css`, true)
];

if (DEBUG) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    );
} else {
    plugins.push(
        new webpack.BannerPlugin(banner),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    );

    if (RELEASE) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                mangle: true,
                compress: {
                    warnings: VERBOSE
                },
                output: {
                    preamble: `/*!\n${banner}\n*/`
                }
            })
        );
    }
}

var cssLoader = [
    'css?' + ( RELEASE ? 'minimize&' : 'sourceMap&') + 'importLoaders=1',
    'postcss',
    'resolve-url?' + ( BUILD || DEBUG ? 'sourceMap' : '' ),
    'sass?sourceMap'
];

if (DEBUG) {
    cssLoader.unshift('style');
    cssLoader = cssLoader.join('!');
} else {
    cssLoader = ExtractTextPlugin.extract(cssLoader);
}

module.exports = {
    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
    devServer: {
        contentBase: __dirname,
        hot: true,
        inline: true,
        host: 'localhost',
        port: 8080
    },
    stats: {
        colors: true,
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        modules: false
    },
    cache: DEBUG,
    profile: PROFILE,
    debug: DEBUG,
    entry: entry,
    externals: {
        openlayers: 'ol'
    },
    output: {
        path: outDir,
        filename: `${bundleName}.js`,
        publicPath: DEBUG ? 'http://localhost:8080/dist/' : '/dist/',
        crossOriginLoading: "anonymous",
        library: exportName,
        libraryTarget: 'umd'
    },
    resolve: {
        root: [nodeModulesDir],
        extensions: ['', '.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.css']
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: true,
        __filename: "mock",
        __dirname: "mock",
        setImmediate: true,
        fs: "empty"
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            exclude: [outDir],
            loaders: ['ts']
        }, {
            test: /\.jsx?$/,
            exclude: [outDir],
            loaders: ['babel']
        }, {
            test: /\.s?css$/i,
            exclude: [outDir],
            loader: cssLoader
        }, {
            test: /\.json$/i,
            exclude: [outDir],
            loader: 'json'
        }, {
            test: /\.txt$/i,
            exclude: [outDir],
            loader: 'raw'
        }]
    },
    plugins: plugins,
    postcss: function (bundler) {
        return [
            require('postcss-import')({ addDependencyTo: bundler }),
            require('precss')(),
            require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
        ];
    }
};
