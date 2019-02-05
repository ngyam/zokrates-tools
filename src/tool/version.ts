import * as path from 'path'
import * as fs from 'fs'

exports.command = 'version'
exports.desc = "Prints version number."
exports.builder = (yargs) => {
    return yargs
}

exports.handler = async function (argv) {
  return await versionprint(argv)
}

async function versionprint(argv) {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname,"..","..","..","package.json"), 'utf-8'))
    console.log(pkg.version)
}
