import * as path from 'path'
import * as utils from '../utils'

const script = path.join(__dirname, "..","..","..","scripts","copy.sh")

exports.command = 'copyto <filepath> [options]'
exports.desc = "Copies a .code file into its created project folder in the running ZoKrates container."
exports.builder = (yargs) => {
    return yargs
        .positional("filepath", {
            type: 'string',
            desc: "The path to the .code file.",
            alias: "f",
            default: undefined
        })
        .option('name', {
            desc: 'Name of the project folder and .code file to be created in the container. By default it is taken from the input .code filename. You can rename it though.',
            demandOption: false,
            type: 'string',
            alias: "n",
            default: undefined
        })
}
exports.handler = async function (argv) {
  return await copyto(argv)
}

export async function copyto(argv) {
    const fname = utils.extractName(argv)
    const command = `${script} ${path.resolve(process.cwd(), argv.filepath)} ${fname}`
    await utils.execCmd(command)
}
