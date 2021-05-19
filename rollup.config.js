import babel from '@rollup/plugin-babel';

export default {
  input: 'node_modules/styleguide/src/osg.js',
  output: {
    file: 'dist/osg.js'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' })
  ]
};
