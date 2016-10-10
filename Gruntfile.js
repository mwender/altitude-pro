module.exports = function(grunt) {
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
          'lib/css/main.css': 'lib/less/main.less',
          'lib/css/print.css': 'lib/less/print.less'
        }
      },
      production: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'lib/css/main.css': 'lib/less/main.less',
          'lib/css/print.css': 'lib/less/print.less'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
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
      json: {
         files: ['lib/json/*.json'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less:production']);
  grunt.registerTask('builddev', ['less:development']);
};