
"use strict";

module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      server: {
        options: {
          port: 8080,
          bases: 'dist'
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['react'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy'],
        options: {
          spawn: false,
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['path/*.html'], dest: 'dist/', filter: 'isFile'}
        ]
      }
    },
    react: {
      single_file_output: {
        files: {
        }
      },
      combined_file_output: {
        files: {}
      },
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'src/js',
            src: ['**/*.js'],
            dest: 'dist',
            ext: '.js'
          }
        ]
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dev', ['copy', 'express', 'watch']);



  /*
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });
  grunt.registerTask('default', []);
  grunt.loadNpmTasks('grunt-react');
  */
};
