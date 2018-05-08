class SupershitComponent {
  constructor (cmpName, opts) {
    const CmpClass = this.loadComponent(cmpName)
    this.cmp = new CmpClass()
    this.cmp.coupple(opts.model)
  }

  loadComponent (cmpName) {
    return superimport(cmpName)
  }
}
