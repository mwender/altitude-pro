# Altitude Pro Child Theme

This is my personal repository of the [Altitude Pro Theme by StudioPress](http://my.studiopress.com/themes/altitude/). I use this repository to maintain any edits I make to the theme while also allowing for future updates by updating the `master` branch.

## Methodology
The `master` branch always maintains the latest version of the theme available for download from [StudioPress.com](http://studiopress.com). The `develop` branch is my baseline starter version of this theme. It has the following features:

- All CSS moved to `lib/css/main.css`.
- CSS moved to `lib/less/` and compiled with [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less).
- Custom favicon specified in `functions.php`.

Any time I start a new project using this theme, I create a branch from `develop`. Any time there are updates to the Altitude Pro Theme, I update `master` with the new version of the theme, and then I merge `master` into `develop`.

## Deployment
Whenever I deploy this theme, I run `grunt build` to compile `lib/less/main.less` to `lib/css/main.css`.

## Usage
This repository is intended only for my private development and for public demonstration purposes only. If you want to use the [Altitude Pro Theme](http://my.studiopress.com/themes/altitude/) in your project, visit the [StudioPress website](http://studiopress.com) and purchase a copy.

## Changelog

- Version 1.0 - Updated 01/12/2015
