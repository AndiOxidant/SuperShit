'use strict'

const cli = require('child_process')
const CLITable = require('cli-table')

class CLITools {
  static printPM2Status (list) {
    const table = new CLITable({
      colAligns: ['', '', '', 'right', '', 'right', '']
    })

    const lines = [['ID', 'PID', 'Status', 'Restarts', 'Uptime', 'CPU usage', 'Memory']]
    for (const inst of list) {
      lines.push([
        inst.pm_id,
        inst.pid,
        inst.pm2_env.status,
        inst.pm2_env.restart_time,
        inst.pm2_env.pm_uptime,
        `${inst.monit.cpu}%`,
        inst.monit.memory
      ])
    }

    table.push.apply(table, lines)
    console.log(table.toString()) // eslint-disable-line no-console
  }

  static exec (cmd, opt) {
    opt = opt || {}
    return new Promise((resolve, reject) => {
      let sess
      const cliOpt = Object.assign({
        env: process.env
      }, opt)

      sess = cli.exec(cmd, cliOpt, (err, stdout, stderr) => {
        if (err) return reject(err)
        resolve(Object.assign(sess, {
          stderr,
          stdout
        }))
      })
    })
  }
}

module.exports = CLITools
