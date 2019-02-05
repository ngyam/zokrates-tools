#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zoktools = require("./tool");
exports.zoktools = zoktools;
const yargs = require("yargs");
yargs
    .commandDir('tool')
    .demandCommand(1, 'You need to give at least a command.')
    .help()
    .argv;
//# sourceMappingURL=index.js.map