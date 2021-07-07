import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/styleguide.js',
  output: {
    file: 'dist/styleguide.js'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    vue()
  ],
  cache: true
};
