Supershit CLI
=============

Supershit has a commandline interface. Run `npm i -g supershit` to install supershit CLI globaly

## Commands

The help command shows a list of all available sub-commands, including own commands if possible.  
Change into your project root and type `supershit help`


### Sub Commands

Command | Description
--------|------------
`dev` | Start app in devmode. Reloads app everytime when any source file changes
`help` | Shows a list of all available commands
`project` | Create new supershit project
`start` | Start app in cluster mode
`restart` | Restart app in cluster mode
`stop` | Stop a running app
`status` | Show app status


### Create new project

`supershit project <name> <projectDir>`

 Creates a project in the current working dir. It copies files and dirs from the draft folder into `<projectDir>`, uses current working as `<projectDir>` if it isn't set.

Creates a project under the current working dir by copying files from the drafts folder.


#### Arguments:
Argument | Required | Description
---------|:--------:|------------
`name` | - | Project name
`projectDir` | - | Project folder


### Start app

`supershit start [options]`

Start a supershit-app in clustermode. It spawns 4 instances per default.
Uses current working dir as project dir.

#### Arguments:
Argument | Required | Description
---------|:--------:|------------
`instances` | - | Start [number] instances


### Restart app

`supershit resstart [options]`

Restart a running supershit-app.

#### Arguments:
This task hasn't got any arguments.

### Stop app

`supershit stop [options]`

Stops a running supershit-app.
Uses current working dir as project dir.

#### Arguments:
This task hasn't got any arguments.


### Show app status

`supershit status [options]`

Shows status of a current running supershit-app.

#### Arguments:
This task hasn't got any arguments.



## Register own Commands

Its easy to create own CLI commands. In your project folder is a `bin/` dir for CLI commands.
The filename should be identical with the command, otherwise Supershit can't find it during a call.

Lets create a `hello` command which prints `Hello World!` on the screen.

**Step 1:** Create a file for the task: `touch bin/hello.js`

**Step 2:** Insert the following code:

```js
module.exports = (supershit) => {
  return supershit
    .cmd('hello')
    .action((ctx) => {
      console.log('Hello World!')
    })
}
```

**Step 3:** Call in a command line `supershit hello` and you'll see `Hello World!` on your screen.

A call of `supershit.cmd()` registers a CLI task and returns a `SupershitCommand` object. The `.action()` method requires an action function which get called when the command is called. The action method has one `ctx` argument followed by all command line arguments. The `ctx` object contains all options.

```js
module.exports = (supershit) => {
  return supershit
    .cmd('hello <name>')
    .option('-l, --lowercase', 'Lowercase the output')
    .action((ctx, name) => {
      const msg = `Hello ${name}!`
      if (ctx.lowercase) {
        console.log(msg.toLowerCase())
      } else {
        console.log(msg)
      }
    })
}
```

### `SupershitCommand`

Each call of `supershit.cmd()` returns an instance of the SupershitCommand class.

### Options

Name | Description
-----|------------
`workingDir` | Set the working dir, defaults to `process.cwd()`

### Methods

#### cmd(*str* command) - Set a command

Defines a command with optional cli arguments. `.cmd('start <file> [logFile...]')`

#### description(*str* description) - Define a description

The description gets shown in the help pages

#### version(*str* version) - Set a version number

The version number gets shown by using the `--version` option

#### option(*str* option, *str* description) - Add a command line option

Adds a command line option, call it for each option. The option syntax is a string and takes a short and long version separated by a comma. `.option('-d,--debug', 'Enable debug mode')`

#### action(*func* fn) - Defines an action function

The action function gets called with a `ctx` argument followed by all cli arguments.
Place all the logic here. Write output to stdout or use `console.log()`
