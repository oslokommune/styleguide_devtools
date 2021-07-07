import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
  input: 'node_modules/styleguide/src/packages/devtools/_index.js',
  output: {
    file: 'dist/styleguide.js'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    vue()
  ],
  cache: true
};
