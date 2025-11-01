import { makeKarmaConfigurator } from '@fpjs-incubator/broyster/node.js'

export default makeKarmaConfigurator({
  projectName: 'BotD',
  tsconfigPath: 'tsconfig.karma.json',
  includeFiles: ['src/**/*.ts', 'tests/**/*.ts', 'test-dist/botd.min.js'],
  configureCustom(karmaConfig) {
    karmaConfig.set({
      failOnEmptyTestSuite: false,
    })
  },
})
