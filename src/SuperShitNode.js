'use strict';

const log = require('logtopus').getLogger('supershit')

class SuperShitNode {
  constructor(conf) {
    this.node = conf
    this.node.childs = []
  }

  addChild(child) {
    if (!this.node.childs) {
      this.node.childs = []
    }

    this.node.childs.push(child)
  }

  cmp(cmpName, conf) {
    log.debug(`Add CMP ${cmpName}`, conf)
    const c = new SuperShitNode({
      type: 'cmp',
      name: cmpName,
      model: conf.model ? conf.model.name : undefined,
      list: conf.list ? conf.list.name : undefined
    })

    this.addChild(c)
    return c
  }

  tmpl(template, conf) {
    const c = new SuperShitNode({
      type: 'tmpl',
      template,
      model: conf.model ? conf.model.name : undefined,
      list: conf.list ? conf.list.name : undefined
    });

    this.addChild(c)
    return c
  }

  html(content) {
    const c = new SuperShitNode({
      type: 'html',
      content
    })

    this.addChild(c)

    return c
  }

  toJSON() {
    const nodeCopy = Object.assign({}, this.node);
    nodeCopy.childs.map((n) => n.toJSON());
    return nodeCopy;
  }

  getComponents() {
    const components = []
    const walker = (nodes) => {
      for (const n of nodes) {
        if (n.type === 'cmp') {
          components.push(n.name)
        }

        if (n.childs) {
          walker(n.childs)
        }
      }
    }

    walker(this.nodes.childs)
    return components
  }
}

module.exports = SuperShitNode
