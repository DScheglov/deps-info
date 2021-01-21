const { escapeRegExp } = require("./helpers");

const KeepAll = () => true;

const depMatch = re => ([name]) => re.test(name);

const filterDeps = templates =>
  templates.length > 0
    ? depMatch(new RegExp(templates.map(escapeRegExp).join('|')))
    : KeepAll;

module.exports = filterDeps;