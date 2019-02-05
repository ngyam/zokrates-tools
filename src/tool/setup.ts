import * as path from 'path'
import * as utils from '../utils'

const script = path.join(__dirname, "..","..","..","scripts","setup.sh")

exports.command = 'setup <name> [options]'
exports.desc = "Performs the trusted setup for the project in the running ZoKrates container."
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
  return await setup(argv)
}

export async function setup(argv) {
    const fname = utils.extractName(argv)
    const command = `${script} ${fname}`
    await utils.execCmd(command)
}
