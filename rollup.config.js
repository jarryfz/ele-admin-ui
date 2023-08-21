import commonjs from 'rollup-plugin-commonjs';
import vuePlugin from 'rollup-plugin-vue';
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index-umd.js',
      name: 'eleAdminUi',
      format: 'umd',
      globals: {
        vue: 'Vue'
      }
    },
    {
      file: 'lib/index-es.js',
      format: 'es'
    }
  ],
  extrenal: [],
  plugins: [
    commonjs(),
    vuePlugin()
  ]
}