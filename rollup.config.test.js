import { commonInput, createBundle } from './rollup.config'

export default [
  {
    ...commonInput,
    output: [createBundle('botd.min.js', 'iife')],
  },
]
