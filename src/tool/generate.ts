import * as path from 'path'
import * as utils from '../utils'

const script = path.join(__dirname, "..","..","..","scripts","generate.sh")

exports.command = 'generate <name> [options]'
exports.desc = "Performs a full generation of a project inside the ZoKrates container: compile, setup, witness, proof and generate verifier contract. All the generated files are located inside the project folder."
exports.builder = (yargs) => {
    return yargs
        .positional('name', {
            desc: 'Name of the project folder and .code file in the container.',
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
  return await generate(argv)
}

export async function generate(argv) {
    const fname = utils.extractName(argv)
    const command = `${script} ${fname} ${argv.witness.join(" ")}`
    await utils.execCmd(command)
}
