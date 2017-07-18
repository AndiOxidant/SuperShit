const path = require('path');
const fs = require('fs');

const copyDir = require('copy-dir');
// const createModule = require('../modules/createModule');

class ProjectManager {
  static getProjectDir(projectName) {
    if (!projectName) {
      throw 'Missing project name!';
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(projectName)) {
      throw 'Invalid project name! Only a-z A-Z 0-9 _ . - are allowed in project names.';
    }

    return path.join(process.cwd(), projectName)
  }

  static createProject(projectName) {
    const srcDir = path.join(__dirname, '../../drafts/project/')
    const destDir = ProjectManager.getProjectDir(projectName)

    copyDir.sync(srcDir, destDir, (stat, filepath, filename) => {
      const destFile = path.join(destDir, path.relative(srcDir, filepath))
      console.log('DESTF', destFile)
      console.log('DESTF', filename)
      return false
    });
    //
    // //Write packege.json
    // const pkg = require(path.join(process.cwd(), projectName, 'package.json'));
    // pkg.name = projectName;
    // fs.writeFileSync(path.join(process.cwd(), projectName, 'package.json'), JSON.stringify(pkg, null, '    '));
    //
    // process.chdir(destDir);
    // createModule('index');
  }
}

module.exports = ProjectManager
