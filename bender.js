/* jshint browser: false, node: true */

'use strict';

const config = {
	plugins: [
		'benderjs-chai',
		'benderjs-coverage',
		'benderjs-mocha',
		'benderjs-promise',
		'benderjs-sinon',
		'benderjs-reporter-junit',
		'dev/bender/plugins/ckeditor5'
	],

	framework: 'mocha',

	applications: {
		'ckeditor': {
			path: '.',
			files: [
				'node_modules/requirejs/require.js'
			],
			basePath: '/apps/ckeditor/dist/amd/'
		}
	},

	tests: {
		all: {
			applications: [ 'ckeditor' ],
			paths: [
				'dist/amd/tests/**',
				'!dist/amd/tests/**/_*/**'
			]
		}
	},

	coverage: {
		paths: [
			'dist/amd/ckeditor.js',
			'dist/amd/ckeditor5/**/*.js',
			'dist/amd/tests/**/_*/*.js',
			'!dist/amd/ckeditor5/*/lib/**'
		]
	},

	jUnitReporter: {
		outputFile: 'test-results/result.xml'
	}
};

module.exports = config;
