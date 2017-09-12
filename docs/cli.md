Supershit CLI
=============

Supershit has a commandline interface. Run `npm i -g supershit`

## Commands

### Create new project (draft)

`supershit project <name> <projectDir>`

 Creates a project in the current working dir. It copies files and dirs from the draft folder into `<projectDir>`, uses current working as `<projectDir>` if it isn't set.

Creates a project under the current working dir by copying files from the drafts folder.


#### Arguments:
|argument|required|description|
|---|:---:|
| **name** | - | Project name, uses current working dir as project name if it isn't set |
| **projectDir** | - | Project folder |

## Register own Commands

Its very easy to create own CLI tasks. In your project folder is a `bin/` dir. Place CLI commands here.
The filename should be identical with the command, otherwise supershit can't find it if you try to call it.

Lets create a `hello` command which prints `Hello World!` on the screen.

**Step 1:** Create a file for the task: `bin/hello.js`

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

A call of `supershit.cmd()` registers a CLI task and returns a `SupershitCommand` object. The `.action()` method requires an action function which get called then. The action method has one `ctx` argument followed by all command line arguments. The `ctx` object contains all options.

```js
module.exports = (supershit) => {
  return supershit
    .cmd('hello <name>')
    .option('-l, --lowercase', 'Lowercase the output')
    .action((ctx, name) => {
      let msg = `Hello ${name}!`
      if (ctx.lowercase) {
        console.log(msg.toLowerCase())
      } else {
        console.log(msg
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

Defines a command with optional arguments. `.cmd('start <file> [logFile...]')`

#### option(*str* option, *str* description) - Add a command line option

Adds a command line option, call it for each option. The option syntax is a string and takes a short and long version separated by a comma. `.option('-d,--debug', 'Enable debug mode')`
