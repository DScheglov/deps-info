#!/usr/bin/env node

const { DependencyPromise } = require('./deps');
const { packageJson } = require('./package-info');
const { chain } = require('./helpers');
const { csv } = require('./inputs');
const { formatJson, formatCsv } = require('./mappers');

const {
  dependencies = {},
  devDependencies = {},
} = packageJson;

const getAllDeps = () => Promise.all([
  ...Object.entries(dependencies).map(DependencyPromise('prod')),
  ...Object.entries(devDependencies).map(DependencyPromise('dev')),
]);

const process = chain(
  getAllDeps,
  csv ? formatCsv : formatJson,
  console.log,
);

process().catch(console.error);