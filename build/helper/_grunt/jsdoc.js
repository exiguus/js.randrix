module.exports = {
  dist: {
    src: ['src/js/*.js'],
    options: {
      configuration: '../../jsdoc.json',
      destination: '<%= paths.jsdoc %>',
      readme: 'README.md',
    },
  },
};
