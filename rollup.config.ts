import * as fs from 'fs'
import type { RollupOptions } from 'rollup'
import jsonPlugin from '@rollup/plugin-json'
import nodeResolvePlugin from '@rollup/plugin-node-resolve'
import typescriptPlugin from '@rollup/plugin-typescript'
import dtsPlugin from 'rollup-plugin-dts'
import licensePlugin from 'rollup-plugin-license'

const { dependencies } = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const outputDirectory = 'dist'

export const commonInput = {
  input: 'src/index.ts',
  plugins: [nodeResolvePlugin(), jsonPlugin(), typescriptPlugin()],
}

export const commonOutput = {
  name: 'BotD',
  exports: 'named' as const,
  plugins: [
    licensePlugin({
      banner: {
        content: {
          file: 'resources/license_banner.txt',
        },
      },
    }),
  ],
}

const config: RollupOptions[] = [
  // NPM bundles. They have all the dependencies excluded for end code size optimization.
  {
    ...commonInput,
    external: Object.keys(dependencies),
    output: [
      // CJS for usage with `require()`
      {
        ...commonOutput,
        file: `${outputDirectory}/botd.cjs.js`,
        format: 'cjs',
      },

      // ESM for usage with `import`
      {
        ...commonOutput,
        file: `${outputDirectory}/botd.esm.js`,
        format: 'esm',
      },
    ],
  },

  // TypeScript definition
  {
    ...commonInput,
    plugins: [dtsPlugin()],
    output: {
      ...commonOutput,
      file: `${outputDirectory}/botd.d.ts`,
      format: 'esm',
    },
  },
]

export default config
