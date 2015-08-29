module.exports = function(grunt) {

  grunt.initConfig({
    eslint: {
      src: ['speck.js', 'Gruntfile.js', './templates/tape/**.js']
    },
    watch: {
      files: ['<%= eslint.src %>'],
      tasks: ['eslint']
    }
  });

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Lint files by typing "grunt lint" on the command line
  grunt.registerTask('lint', ['eslint']);

  // Test by typing "grunt test" on the command line
  grunt.registerTask('test', ['eslint']);
};
