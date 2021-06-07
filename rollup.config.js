import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
  input: 'node_modules/styleguide/src/osg.js',
  output: {
    file: 'dist/osg.js'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    vue()
  ],
  cache: true
};
