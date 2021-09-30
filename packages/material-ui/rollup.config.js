import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import fileSizeVisualization from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const config = {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        external({
            includeDependencies: true,
        }),
        babel({
            exclude: /node_modules/,
            babelHelpers: 'runtime',
        }),
        resolve(),
        commonjs(),
        fileSizeVisualization(),
        terser(),
    ],
}

export default config
