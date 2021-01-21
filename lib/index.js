#!/usr/bin/env node

const { DependencyPromise } = require('./deps');
const { packageJson } = require('./package-info');
const { chain } = require('./helpers');
const { csv, only, params } = require('./inputs');
const { formatJson, formatCsv } = require('./mappers');
const matchedDeps = require('./deps-filter')(params);

const {
  dependencies = {},
  devDependencies = {},
} = packageJson;

const getDeps = (deps, type) => 
  Object.entries(deps)
    .filter(matchedDeps)
    .map(DependencyPromise(type));

const getAllDeps = () => Promise.all([
  ...(only !== 'dev' ? getDeps(dependencies, 'prod') : []),
  ...(only !== 'prod' ? getDeps(devDependencies, 'dev') : []),
]);

const run = chain(
  getAllDeps,
  csv ? formatCsv : formatJson,
  console.log,
);

run().catch(console.error);