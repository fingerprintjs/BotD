import * as BotD from '../src'

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

    const components = instance.get()
    expect(components).toBeInstanceOf(Object)

    const detectorsResponses = instance.getDetectorsResponses()
    expect(detectorsResponses).toBeInstanceOf(Object)
  }, 10000) // Such tests can take too much time to complete on BrowserStack
})
