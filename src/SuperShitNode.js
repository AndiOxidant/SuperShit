class SuperShitNode {
  constructor(conf) {
    this.node = conf
    this.node.childs = []
  }

  cmp(cmpName, conf) {
    const c = new SuperShitNode({
      type: 'cmp',
      name: cmpName,
      model: conf.model ? conf.model.name : undefined,
      list: conf.list ? conf.list.name : undefined
    })

    this.node.childs.push(c)
    return c
  }

  tmpl(template, conf) {
    const c = new SuperShitNode({
      type: 'tmpl',
      template,
      model: conf.model ? conf.model.name : undefined,
      list: conf.list ? conf.list.name : undefined
    });

    this.node.childs.push(c)
    return c
  }

  html(content) {
    const c = new SuperShitNode({
      type: 'html',
      content
    })

    this.node.childs.push(c)

    return c
  }

  toJSON() {
    const nodeCopy = Object.assign({}, this.node);
    nodeCopy.childs.map((n) => n.toJSON());
    return nodeCopy;
  }
}

module.exports = SuperShitNode
