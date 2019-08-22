const fetch = require('node-fetch');
const { compose, chain, parseJson, raiseError } = require('./helpers');
const { packageJson, packageLock } = require('./package-info');

const baseURL = 'https://registry.npmjs.org';

const Dependency = type => ([name, vesionQuery]) => ({
  name,
  type,
  vesionQuery,
  version: packageLock.dependencies[name].version,
});

const PackageInfo = dependency => ({
  description,
  author,
  homepage,
  license,
  dist,
  _id,
}) => ({
  ...dependency,
  _id,
  description,
  author: author && author.name,
  homepage,
  license,
  licenseUrl: dist.tarball,
  error: null,
});

const PackageError = dependency => error => ({
  ...dependency,
  _id: null,
  description: '',
  author: null,
  homepage: '',
  license: '',
  licenseUrl: '',
  error: error ? error.message : 'something went wrong',
});

const packageUrl = ({ name, version }) => `${baseURL}/${encodeURIComponent(name)}/${version}`;

const getPackage = dependency => fetch(`${baseURL}/${dependency.name}/${dependency.version}`)
  .then(raiseError)
  .then(
    chain(parseJson, PackageInfo(dependency))
  )
  .catch(
    chain(parseJson, PackageError(dependency))
  );

const DependencyPromise = type => compose(getPackage, Dependency(type));

module.exports = {
  Dependency,
  PackageInfo,
  PackageError,
  getPackage,
  DependencyPromise,
};