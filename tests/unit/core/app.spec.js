'use strict';

const inspect = require('inspect.js');
const sinon = require('sinon');
inspect.useSinon(sinon);

const CoreIO = require('coreio');
const supershit = require('../../../src/app');

describe('Supershit', () => {
  describe('api', () => {
    let sandbox

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    });

    it('registers a supershit api', () => {
      const stub = sandbox.stub(CoreIO, 'api')
      const callObj = {
        get() {}
      }

      supershit.api('/foo').route('/bar', callObj)

      inspect(stub).wasCalledOnce()
      inspect(stub).wasCalledWith('/foo/bar', callObj)
    })
  })

  describe('app', () => {
    it('registers a supershit app', () => {

    })
  })

  describe('config', () => {
    it('load config from config file', () => {

    });
  });
})
