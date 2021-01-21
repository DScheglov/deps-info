const { compose } = require('./helpers');

const params = process.argv.slice(2);

const get = (obj, prop) => obj && obj[prop];

const parsedParam = value => ({
  name: get(/^--([^=]+)/.exec(value), 1),
  value: get(/^(?:--[^=]+=)?(.*)$/.exec(value), 1) || true,
});

const defaultFlags = {
  csv: false,
  json: true,
  only: '',
  params: [],
}

const flags = params.map(parsedParam).reduce(
  (f, { name, value }) =>
    name == null
      ? { ...f, params: f.params.concat(value) }
      : { ...f, [name.toLowerCase()]: value },
  { ...defaultFlags },
);

module.exports = flags;
