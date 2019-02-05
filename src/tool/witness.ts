import * as path from 'path'
import * as utils from '../utils'

const script = path.join(__dirname, "..","..","..","scripts","witness.sh")

exports.command = 'witness <name> [options]'
exports.desc = "Generates the witness for the project in the running ZoKrates container."
exports.builder = (yargs) => {
    return yargs
        .positional('name', {
            desc: 'Name of the project folder and .code file.',
            type: 'string',
            alias: "n",
            default: undefined
        })
        .option('witness', {
            desc: 'List of witness params. Positional arguments to the corresponsing ZoKrates command.',
            demandOption: true,
            type: 'array',
            alias: "w",
            default: []
        })
}

exports.handler = async function (argv) {
  return await witness(argv)
}

export async function witness(argv) {
    const fname = utils.extractName(argv)
    const command = `${script} ${fname} ${argv.witness.join(" ")}`
    await utils.execCmd(command)
}
