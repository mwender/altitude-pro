module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: 'lib/css/main.css.map',
          sourceMapBasepath: 'lib/less',
          sourceMapURL: 'main.css.map',
          sourceMapRootpath: '../../lib/less'
        },
        files: {
          // target.css file: source.less file
          'lib/css/main.css': 'lib/less/main.less'
        }
      },
      production: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'lib/css/main.css': 'lib/less/main.less'
        }
      }
    },
    watch: {
      styles: {
        files: ['lib/less/**/*.less'], // which files to watch
        tasks: ['less:development'],
        options: {
          nospawn: true
        }
      },
      htmlincludes: {
        files: ['lib/html/*.html'],
        options: {
          nospawn: true
        }
      },
      js: {
        files: ['js/*.js'],
        options: {
          nospawn: true
        }
      },
      json: {
         files: ['lib/json/*.json'],
        options: {
          nospawn: true
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'lib/less/**/*.less',
            'lib/html/*.html',
            'js/*.js',
            'lib/json/*.json'
          ]
        },
        options: {
          proxy: "2017.edgeseccon.dev",
          watchTask: true
        }
      }
    }
  });

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('build', ['less:production']);
  grunt.registerTask('builddev', ['less:development']);
};