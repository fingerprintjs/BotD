import areMimeTypesConsistent from './mime_types_consistence'

describe('Sources', () => {
  describe('mimeTypesConsistence', () => {
    it('returns an expected value', () => {
      expect(areMimeTypesConsistent()).toBeTrue()
    })
  })
})
