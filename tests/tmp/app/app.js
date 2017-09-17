const Supershit = require('supershit')

const appNode = Supershit.app({
  path: '/',
  title: 'My supershit app!'
})

const WelcomeModel = {
  name: 'WelcomeModel'
}

appNode.cmp('WelcomeCmp', {
  model: WelcomeModel
})

appNode.html('<article>Your supershit app has been started succesfully!</article>')
