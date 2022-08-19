#!/usr/bin/env node

const yargs = require("yargs");

const options = yargs
 .usage("Usage: -t <test>")
 .option("t", { alias: "test", describe: "Run specific test", type: "string" })
 .argv;

const Pa11yAccessibility = require('../index');
const config = require(`${process.cwd()}/pa11y.config`)
const accessibility = new Pa11yAccessibility(config);
accessibility.run(options);
