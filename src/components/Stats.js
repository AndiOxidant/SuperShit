class Stats extends FireCMP.Core {
  get tag () {
    return 'section'
  }

  tmpl (data) {
    return `
      <section class="metric">
        <span class="name">Server uptime:</span>
        <span class="value">${data.uptime}</span>
      </section>
    `
  }
}

module.exports = Stats
