const SuperShit = require('supershit')

const appNode = SuperShit.app({
  path: '/',
  title: 'My supershit app!'
})

const WelcomeModel = {
  name: 'WelcomeModel'
}

appNode.cmp('WelcomeCmp', {
  model: WelcomeModel
})

appNode.html('<article><your supershit app has been started succesfully!</article>')
