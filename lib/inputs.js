const { compose } = require('./helpers');

const params = process.argv.slice(1);

const get = (obj, prop) => obj && obj[prop];

const flagName = value => get(
  /^--(.+)$/.exec(value),
  1
);

const flag = flagName => (
  flagName != null
    ? { [flagName.toLowerCase()]: true }
    : null
);

const defaultFlags = {
  csv: false,
  json: true,
}

const flags = Object.assign(
  {},
  defaultFlags,
  ...params.map(
    compose(flag, flagName)
  )
);

module.exports = flags;
