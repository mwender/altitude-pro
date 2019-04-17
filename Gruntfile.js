module.exports = function(grunt) {
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
      development2: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: 'lib/css/main-minimal.css.map',
          sourceMapBasepath: 'lib/less',
          sourceMapURL: 'main-minimal.css.map',
          sourceMapRootpath: '../../lib/less'
        },
        files: {
          // target.css file: source.less file
          'lib/css/main-minimal.css': 'lib/less/main-minimal.less'
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
          'lib/css/main-minimal.css': 'lib/less/main-minimal.less'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      styles: {
        files: ['lib/less/**/*.less'], // which files to watch
        tasks: ['less:development','less:development2'],
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less:production']);
  grunt.registerTask('builddev', ['less:development','less:development2']);
};