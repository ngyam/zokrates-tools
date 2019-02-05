import * as path from 'path'
import * as utils from '../utils'

const script = path.join(__dirname, "..","..","..","scripts","proof.sh")

exports.command = 'proof <name> [options]'
exports.desc = "Generates the proof for the project in the running ZoKrates container."
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
  return await proof(argv)
}

export async function proof(argv) {
    const fname = utils.extractName(argv)
    const command = `${script} ${fname}`
    await utils.execCmd(command)
}
