'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const sass = require('gulp-sass');
const exec = require('child_process').exec;
const webpack = require('webpack-stream');
const merge = require('lodash/merge');

const webpackConfig = {
  entry: {
    main: './src/demo/main.js',
    vendor: ['react']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  output: {
    filename: 'main.js'
  },
  plugins: [
    new webpack.webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)
  ]
};

gulp.task('webpack:demo', (done) => {
  return gulp.src('./')
    .pipe(webpack(merge(webpackConfig, {
      entry: {
        main: './src/demo/main.js'
      }
    })).on('data', util.log).on('error', done))
    .pipe(gulp.dest('./demo'));
});

gulp.task('copy:demo', () => {
  return gulp.src('./src/demo/index.html')
    .pipe(gulp.dest('./demo'));
});

gulp.task('sass:demo', () => {
  return gulp.src('./src/demo/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./demo'));
});

gulp.task('watch:webpack:demo', () => {
  return gulp.watch('./src/**/*.js', ['webpack:demo']);
});

gulp.task('watch:copy:demo', () => {
  return gulp.watch('./src/demo/index.html', ['copy:demo']);
});

gulp.task('watch:sass:demo', () => {
  return gulp.watch('./src/**/*.scss', ['sass:demo']);
});

gulp.task('build', () => {
  exec('npm run clean && npm run build').stdout.on('data', (data) => {
    util.log(data);
  });
});

gulp.task('watch:build', () => {
  return gulp.watch(['./src/**/*.js'], ['build']);
});

gulp.task('watch:demo', ['watch:webpack:demo', 'watch:copy:demo', 'watch:sass:demo']);

gulp.task('default', ['build', 'webpack:demo', 'copy:demo', 'sass:demo', 'watch:build', 'watch:demo']);