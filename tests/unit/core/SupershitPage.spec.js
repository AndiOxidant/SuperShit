const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SupershitPage = require('../../../src/core/SupershitPage')

describe.only('SupershitPage', () => {
  describe('class', () => {
    it('is a class', () => {
      inspect(SupershitPage).isClass()
    })

    it('creates a SupershitPage instance', () => {
      const page = new SupershitPage('/test')
      inspect(page).isInstanceOf(SupershitPage)
      inspect(page.path).isEql('/test')
      inspect(page.name).isEql('Test')
    })
  })

  describe('getPageName()', () => {
    const pages = [
      { path: '/', name: 'Index' },
      { path: '/test', name: 'Test' },
      { path: '/test/foo', name: 'TestFoo' },
      { path: '/test/foo/bla', name: 'TestFooBla' },
      { path: '/test/foo/bla/:id', name: 'TestFooBla' }
    ]

    pages.forEach((t) => {
      it(`returns "${t.name}" for page "${t.path}"`, () => {
        const page = new SupershitPage(t.path)
        inspect(page.getPageName()).isEql(t.name)
      })
    })
  })
})
