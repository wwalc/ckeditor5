/* jshint node: true */

'use strict';

const gulp = require( 'gulp' );

const fs = require( 'fs' );
const json = JSON.parse( fs.readFileSync( './package.json' ) );

// Check if gulp file is run in dev environment. It will be false when this repository is included as dependency of other project.
let isDev = !json._id;

const config = {
	ROOT_DIR: '.',
	PACKAGES_DIR: isDev ? '.' : '../..',
	BUILD_DIR: isDev ? 'build' : '../../build',
	WORKSPACE_DIR: '..',

	// Files ignored by jshint and jscs tasks. Files from .gitignore will be added automatically during tasks execution.
	IGNORED_FILES: [
		'src/lib/**'
	]
};

require( './dev/tasks/build/tasks' )( config );

if ( isDev ) {
	require( './dev/tasks/dev/tasks' )( config );
	require( './dev/tasks/lint/tasks' )( config );
	require( './dev/tasks/docs/tasks' )( config );

	gulp.task( 'pre-commit', [ 'lint-staged' ] );
}

gulp.task( 'default', [ 'build' ] );
