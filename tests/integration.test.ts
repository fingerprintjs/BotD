import * as BotDModule from '../src'

/*
 * Checks that the distributive file works in a browser.
 * Build the minified script before running this test.
 */
declare const BotD: typeof BotDModule

describe('Integration', () => {
  it('performs bot detection', async () => {
    expect(BotD).toBeInstanceOf(Object)
    expect(typeof BotD.load).toBe('function')

    const fp = await BotD.load()
    expect(typeof fp).toBe('object')

    const instance = await BotD.load()
    expect(instance).toBeInstanceOf(Object)

    const detectionResult = instance.detect()
    expect(detectionResult).toBeInstanceOf(Object)
    expect(typeof detectionResult.bot).toBe('boolean')

    const components = instance.getComponents()
    expect(components).toBeInstanceOf(Object)

    const detections = instance.getDetections()
    expect(detections).toBeInstanceOf(Object)
  }, 10000) // Such tests can take too much time to complete on BrowserStack
})
