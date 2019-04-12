module.exports = {
  // use babel
  // dist: {
  //   cwd: '<%= paths.dev %>/js/',
  //   dest: '<%= paths.dist %>/',
  //   expand: true,
  //   src: [
  //     '<%= name.plugin %>.js',
  //   ],
  // },
  coverage: {
    cwd: '<%= paths.coverage %>/report-html/',
    dest: '<%= paths.jsdoc %>/<%= paths.coverage %>/',
    expand: true,
    src: [
      '**',
    ],
  },
  icov: {
    cwd: '<%= paths.coverage %>/report-Icov/',
    dest: '<%= paths.coverage %>/',
    expand: true,
    src: [
      'Icov.info',
    ],
  },
  static: {
    cwd: '<%= paths.static %>/',
    dest: '<%= paths.jsdoc %>/<%= paths.static %>/',
    expand: true,
    src: [
      '**',
    ],
  },
  favicon: {
    cwd: '<%= paths.example %>/<%= paths.static %>/',
    dest: '<%= paths.docs %>/',
    expand: true,
    src: [
      'favicon.*',
    ],
  },
};
