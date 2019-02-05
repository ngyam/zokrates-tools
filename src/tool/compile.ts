import * as path from 'path'
import * as utils from '../utils'

const script = path.join(__dirname, "..","..","..","scripts","compile.sh")

exports.command = 'compile <name> [options]'
exports.desc = "Compiles the .code file in the running ZoKrates container."
exports.builder = (yargs) => {
    return yargs
        .positional('name', {
            desc: 'Name of the project folder and .code file in the container.',
            type: 'string',
            alias: "n",
            default: undefined
        })
}
exports.handler = async function (argv) {
  return await compile(argv)
}

export async function compile(argv) {
    const fname = utils.extractName(argv)
    const command = `${script} ${fname}`
    await utils.execCmd(command)
}
