import * as path from 'path'
import * as utils from '../utils'

const script = path.join(__dirname, "..","..","..","scripts","trufflecompile.sh")

exports.command = 'trufflecompile <name> [dir] [options]'
exports.desc = "Compiles the verifier in the local project folder. The output is placed in the local project's 'contractbuild/' folder."
exports.builder = (yargs) => {
    return yargs
        .positional('name', {
            desc: 'Name of the local project folder.',
            type: 'string',
            alias: "n",
            default: undefined
        })
        .positional("dir", {
            type: 'string',
            desc: "The local dir, where the project folder was copied from the container.",
            alias: ["o", "d"],
            default: path.join(__dirname, "..","..","..","build","/")
        })
}

exports.handler = async function (argv) {
  return await trufflecompile(argv)
}

export async function trufflecompile(argv) {
    const fname = utils.extractName(argv)
    const pdir = path.join(path.resolve(process.cwd(), argv.dir),fname)
    const command = `${script} "${pdir}" ${fname}`
    await utils.execCmd(command)
}
