import resolve from "@rollup/plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';
import vuePlugin from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import delFile from 'rollup-plugin-delete';
import progress from 'rollup-plugin-progress';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json' assert {type: 'json'}
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index-umd.js',
      name: 'eleAdminUi',
      format: 'umd',
      globals: {
        vue: 'Vue',
        'element-ui': 'ELEMENT'
      }
    },
    {
      file: 'lib/index-es.js',
      format: 'es'
    }
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {})
  ],
  plugins: [
    progress({
      format: '[:bar] :percent (:current/:total)'
    }),
    delFile({
      targets: 'lib/*'
    }),
    resolve({
      extensions: [".vue"]
    }),
    postcss({
      extract: true,
      minimize: true,
      sourcemap: true,
    }),
    commonjs(),
    eslint({
      fix: true, // 自动修复
      include: ['src/**/*.js', 'src/**/*.vue']
    }),
    vuePlugin({
      css: false,
      compileTemplate: true,
      vueTemplateOptions: {
        compilerOptions: {
          compatConfig: {
            MODE: 2, // 指定Vue版本为2.x
          },
        },
      },
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "**/node_modules/**"
    }),
  ]
}