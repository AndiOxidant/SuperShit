const SupershitModel = require('../core/SupershitModel')

class AppStatsModel extends SupershitModel {
  constructor (...args) {
    super(...args)

    this.schema = {
      uptime: { type: 'number', required: true }
    }
  }

  init () {
    this.set('uptime', process.uptime())
  }
}

module.exports = AppStatsModel
