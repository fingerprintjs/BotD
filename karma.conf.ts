import { makeKarmaConfigurator } from '@fpjs-incubator/broyster/node'

module.exports = makeKarmaConfigurator({
  projectName: 'BotD',
  includeFiles: ['src/**/*.ts', 'tests/**/*.ts', 'test-dist/botd.min.js'],
  configureCustom(karmaConfig) {
    karmaConfig.set({
      failOnEmptyTestSuite: false,
    })
  },
})
