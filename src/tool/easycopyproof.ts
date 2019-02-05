import * as path from 'path'
import * as utils from '../utils'

const script = path.join(__dirname, "..","..","..","scripts","easycopyproof.sh")

exports.command = 'easycopyproof <name> [dir] [options]'
exports.desc = "Parses the proof in the local project folder so that it is easier to copy-paste manually."
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
            alias: "o",
            default: path.join(__dirname, "..","..","..","build","/")
        })
}

exports.handler = async function (argv) {
  return await easycopyproof(argv)
}

export async function easycopyproof(argv) {
    const fname = utils.extractName(argv)
    const command = `${script} "${path.resolve(process.cwd(), argv.dir)}" ${fname}`
    await utils.execCmd(command)
}
