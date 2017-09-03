'use strict';

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const ProjectManager = require('../../src/utils/ProjectManager')

describe('ProjectManager', () => {
  describe('getProjectName', () => {
    it('returns a projectName from first cmd arg', () => {
      const projectName = ProjectManager.getProjectName('foo')
      inspect(projectName).isEql('foo')
    })
  })
})
