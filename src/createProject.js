var path = require('path');
var fs = require('fs');

var copyDir = require('copy-dir');
var createModule = require('../modules/createModule');

module.exports = function(projectName) {
    'use strict';

    if (!/^[a-zA-Z0-9_.-]+$/.test(projectName)) {
        throw 'Invalid project name! Only a-z A-Z 0-9 _ . - are allowed chars.';
    }
  
    var srcDir = path.join(__dirname, '../drafts/project/'),
        destDir = path.join(process.cwd(), projectName);

    copyDir.sync(srcDir, destDir);

    //Write packege.json
    var pkg = require(path.join(process.cwd(), projectName, 'package.json'));
    pkg.name = projectName;
    fs.writeFileSync(path.join(process.cwd(), projectName, 'package.json'), JSON.stringify(pkg, null, '    '));

    process.chdir(destDir);
    createModule('index');
};
