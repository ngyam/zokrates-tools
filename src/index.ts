#!/usr/bin/env node
import * as zoktools from "./tool"
import * as yargs from 'yargs'

yargs
.commandDir('tool')
.demandCommand(1, 'You need to give at least a command.')
.help()
.argv

export {
    zoktools
}