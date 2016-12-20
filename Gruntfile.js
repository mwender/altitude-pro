module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
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
        tasks: ['less:production'],
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
      php: {
        files: ['*.php','templates/*.php'],
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
            '*.php',
            'templates/*.php'
          ]
        },
        options: {
          proxy: "provisionfitness.dev",
          watchTask: true
        }
      }
    }
  });

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('build', ['less:production']);
  grunt.registerTask('builddev', ['less:development']);
};