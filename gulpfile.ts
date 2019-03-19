'use strict';

const gulp = require('gulp');
const del = require('del');
const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsProject: any = tsc.createProject('tsconfig.json');
const tslint = require('gulp-tslint');
const nodemon = require('gulp-nodemon');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb: any) => del([ 'dist/server' ], cb));

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () =>
  gulp.src('server/src/**/*.ts')
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report())
);

/**
 * Build Express server
 */
gulp.task('build:server', () => {
  const tsResult = gulp.src('server/src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/server'));
});

/**
 * Copy bin directory for www
 */
gulp.task('serverResources', () =>
  gulp.src([ 'server/src/bin/**' ])
    .pipe(gulp.dest('dist/server/bin'))
);

/**
 * Start the express server
 */
gulp.task('start', () =>
  nodemon({
    script: 'dist/server/bin/www',
    ext: 'html js',
    ignore: [ 'ignored.js' ],
    tasks: [ 'tslint' ]
  }));

/**
 * Build the project.
 * 1. Clean the build directory
 * 2. Build Express server
 * 3. Copy the dependencies.
 */

gulp.task(
  'build',
  gulp.series(
    'clean',
    'build:server',
    'serverResources',
  )
);
