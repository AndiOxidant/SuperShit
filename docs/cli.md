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
