Getting started
===============

## Installation

Run `npm i -g supershit` to install supershit CLI globally

## Create a project

1) Run `supershit project <projectDir> <name>` to create an initial folder structure.  
2) Change into your project `cd <projectDir>`  
3) Run `supershit dev` and wait until the server has been start.  
4) Go to `http://localhost:7448` and check if the welcome page is working.  

### Folder structure

The `supershit project` task creates a basic project. The folder structure is the following:

```dir
app/            Backend related files
  app.js        Bootstrapfile for the backend site
bin/            CLI scripts
config/         Environment specific configurations
logs/           Log files
public/         Public assets like images
web/            Frontend related files
  components/   FireCMP web components
  web.js        Bootstrapfile for the frontend site
```
