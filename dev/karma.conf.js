/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* jshint browser: false, node: true, strict: true */

'use strict';

const path = require( 'path' );

/**
 * @param {Object} options
 * @param {String} options.rootPath Base path that will be used to resolve all patterns.
 * @param {Boolean} options.watch Whether to watch the files and executing tests whenever any file changes.
 * @returns {Object}
 */
module.exports = ( options ) => {
	const karmaConfig = {
		// Base path that will be used to resolve all patterns (eg. files, exclude).
		basePath: options.rootPath,

		// Frameworks to use. Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [ 'mocha', 'chai', 'sinon' ],

		// List of files/patterns to load in the browser.
		// Todo: it should be simplified: `path.join( 'tests', '**', '*.js' )`
		// Unfortunately, commented tests don't pass.
		files: [
			path.join( 'tests', 'autoformat', '**', '*.js' ),
			path.join( 'tests', 'basic-styles', '**', '*.js' ),
			// path.join( 'tests', 'core', '**', '*.js' ),
			path.join( 'tests', 'editor-classic', '**', '*.js' ),
			path.join( 'tests', 'engine', 'conversion', '**', '*.js' ),
			path.join( 'tests', 'engine', 'dataprocessor', '**', '*.js' ),
			path.join( 'tests', 'engine', 'dev-utils', '**', '*.js' ),
			path.join( 'tests', 'engine', 'model', '**', '*.js' ),
			// path.join( 'tests', 'engine', '**', '*.js' ),
			path.join( 'tests', 'enter', '**', '*.js' ),
			path.join( 'tests', 'heading', '**', '*.js' ),
			path.join( 'tests', 'link', '**', '*.js' ),
			path.join( 'tests', 'list', '**', '*.js' ),
			path.join( 'tests', 'markdown-gfm', '**', '*.js' ),
			path.join( 'tests', 'paragraph', '**', '*.js' ),
			path.join( 'tests', 'theme-lark', '**', '*.js' ),
			path.join( 'tests', 'typing', '**', '*.js' ),
			path.join( 'tests', 'ui', '**', '*.js' ),
			path.join( 'tests', 'ui-default', '**', '*.js' ),
			path.join( 'tests', 'undo', '**', '*.js' ),
			path.join( 'tests', 'utils', '**', '*.js' )
		],

		// List of files to exclude.
		exclude: [
			// Ignore all utils which aren't tests.
			path.join( 'tests', '**', '_utils', '**', '*.js' ),

			// All manual tests.
			path.join( 'tests', '**', 'manual', '**', '*.js' ),

			// And all tickets tests (most probably they are also the manual tests).
			path.join( 'tests', '**', 'tickets', '**', '*.js' ),
		],

		// Preprocess matching files before serving them to the browser.
		// Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests/**/*.js': [ 'webpack' ],
			'ckeditor5/**/*.js': [ 'webpack' ]
		},

		webpack: {
			resolve: {
				root: options.rootPath
			},
			module: {
				preLoaders: [
					{
						test: /\.js$/,
						exclude: /(node_modules)/,
						loader: 'babel',
						query: {
							cacheDirectory: false,
							plugins: [ 'transform-es2015-modules-commonjs' ]
						}
					}
				]
			}
		},

		webpackMiddleware: {
			noInfo: true,
			stats: {
				chunks: false
			}
		},

		// Test results reporter to use. Possible values: 'dots', 'progress'.
		// Available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: [ 'progress' ],

		// Web server port.
		port: 9876,

		// Enable/Disable colors in the output (reporters and logs).
		colors: true,

		// Level of logging. Possible values:
		// config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: 'INFO',

		// Start these browsers.
		// Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [ 'Chrome' ],

		// Continuous Integration mode. If true, Karma captures browsers, runs the tests and exits.
		singleRun: true,

		// Concurrency level. How many browser should be started simultaneous.
		concurrency: Infinity,

		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-coverage',
			'karma-chrome-launcher',
			'karma-sinon',
			'karma-webpack',
			'karma-sourcemap-loader'
		],

		// See: https://github.com/webpack/karma-webpack/issues/8#issuecomment-40056889
		browserNoActivityTimeout: 20000
	};

	if ( options.watch ) {
		// Enable/Disable watching file and executing tests whenever any file changes.
		karmaConfig.autoWatch = true;
		karmaConfig.singleRun = false;
	}

	// if ( options.sourcemap ) {
	// 	karmaConfig.preprocessors[ 'tests/**/*.js' ].push( 'sourcemap' );
	// 	karmaConfig.preprocessors[ 'src/**/*.js' ].push( 'sourcemap' );
	// }
	//
	// if ( options.coverage ) {
	// 	karmaConfig.reporters.push( 'coverage' );
	//
	// 	karmaConfig.coverageReporter = {
	// 		dir: 'build/coverage/',
	// 		type: 'html'
	// 	};
	// }

	return karmaConfig;
};
