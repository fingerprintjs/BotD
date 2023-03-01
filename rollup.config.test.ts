import { commonInput, commonOutput } from './rollup.config'

const outputDirectory = 'test-dist'

export default [
  {
    ...commonInput,
    output: [
      {
        ...commonOutput,
        file: `${outputDirectory}/botd.min.js`,
        format: 'iife',
      },
    ],
  },
]
