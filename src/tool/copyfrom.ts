import * as path from 'path'
import * as utils from '../utils'

const script = path.join(__dirname, "..","..","..","scripts","retrieve.sh")

exports.command = 'copyfrom <name> [outputdir] [options]'
exports.desc = "Retrieves the project folder & files from the running ZoKrates container."
exports.builder = (yargs) => {
    return yargs
        .positional('name', {
            desc: 'Name of the project folder in the container.',
            type: 'string',
            alias: "n",
            default: undefined
        })
        .positional("outputdir", {
            type: 'string',
            desc: "The output dir, where the project folder will be copied from the container.",
            alias: "o",
            default: path.join(__dirname, "..","..","..","build","/")
        })
}
exports.handler = async function (argv) {
  return await copyfrom(argv)
}

export async function copyfrom(argv) {
    const fname = utils.extractName(argv)
    const command = `${script} ${path.resolve(process.cwd(), argv.outputdir)} ${fname}`
    await utils.execCmd(command)
}
