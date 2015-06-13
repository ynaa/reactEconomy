
"use strict";

module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    srcPath: 'src',
    distPath: 'dist',
    buildPath: 'public',

    shell: {
        'build-jsx': {
            command: [
                'jsx <%= srcPath %>/js/ <%= distPath %>/js'
            ].join(' && '),
            stdout: true,
            failOnError: true
        }
    },

    mkdir: {
      all: {
        options: {
          mode: '0700',
          create: ['dist']
        }
      }
    },
    clean: ['dist'],
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
        tasks: ['copy:html'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['src/css/*'],
        tasks: ['copy:css'],
        options: {
          spawn: false,
        }
      }
    },
    copy: {
      // libs: {
      //   files: [
      //     {expand: true, src: ['node_modules/**'], dest: 'dist/', filter: 'isFile'}
      //   ]
      // },
      css: {
        files: [
          {expand: true, flatten: true, src: ['src/css/*'], dest: 'dist/css', filter: 'isFile'}
        ]
      },
      html: {
        files: [
          {expand: true, flatten: true, src: ['src/*'], dest: 'dist', filter: 'isFile'}
        ]
      }
    },
    react: {
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'src/js',
            src: ['**/*.js'],
            dest: 'dist/js',
            ext: '.js'
          }
        ]
      }
    }
  });


  grunt.registerTask('jsx', ['shell:build-jsx']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['mkdir', 'react', 'copy']);
  grunt.registerTask('dev', ['build', 'express', 'watch']);



  /*
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });
  grunt.registerTask('default', []);
  grunt.loadNpmTasks('grunt-react');
  */
};
