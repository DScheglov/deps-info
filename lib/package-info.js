const path = require('path');

const workingDir = process.cwd();

const packageJson = require(
  path.join(workingDir, './package.json')
);

const packageLock = require(
  path.join(workingDir, './package-lock.json')
);

module.exports = {
  packageJson,
  packageLock,
}