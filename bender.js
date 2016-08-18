/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* jshint browser: false, node: true, strict: true */

'use strict';

const config = {
	plugins: [
		'benderjs-chai',
		'benderjs-coverage',
		'benderjs-mocha',
		'benderjs-promise',
		'benderjs-sinon',
		'dev/bender/plugins/ckeditor5'
	],

	framework: 'mocha',

	applications: {
		ckeditor: {
			path: '.',
			files: [
				'node_modules/requirejs/require.js',
				'node_modules/babel-polyfill/dist/polyfill.js'
			],
			basePath: '/apps/ckeditor/build/modules/amd/'
		}
	},

	tests: {
		all: {
			applications: [ 'ckeditor' ],
			paths: [
				'build/modules/amd/tests/**',
				'!build/modules/amd/tests/**/@(_utils|_assets)/**'
			]
		}
	},

	coverage: {
		paths: [
			'build/modules/amd/ckeditor.js',
			'build/modules/amd/ckeditor5/**/*.js',
			'build/modules/amd/tests/**/_*/*.js',
			'!build/modules/amd/ckeditor5/*/lib/**'
		]
	},

	// Due to https://github.com/ckeditor/ckeditor5/issues/190.
	testTimeout: 5 * 1000 // 5s
};

module.exports = config;
