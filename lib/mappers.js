const toCsv = require('./csv');

const csvHeaders = [
  'Package',
  'Version',
  'Type',
  'Description',
  'Homepage',
  'License',
  'License Url',
];

const csvInfoRow = ({ name, version, type, description, homepage, license, licenseUrl }) => [
  name, version, type, description, homepage, license, licenseUrl
];

const csvErrorRow = ({ name, version, type, error }) => [
  name, version, type, error, 'n/a', 'n/a', 'n/a'
];

const csvRow = dependency => (
  dependency.error
    ? csvErrorRow(dependency)
    : csvInfoRow(dependency)
);

const formatCsv = deps => toCsv([
  csvHeaders,
  ...deps.map(csvRow),
]);

const formatJson = data => JSON.stringify(data, null, 2);

module.exports = {
  formatCsv,
  formatJson,
};
