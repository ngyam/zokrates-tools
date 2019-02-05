import * as path from "path"
import {exec} from 'child_process'

interface BasicInput {
    name: string,
    filepath: string
}

export function extractName(argv: BasicInput): string {
    if (argv.filepath !== undefined) {
        return (argv.name === undefined) ? argv.filepath.split(".code")[0].split(path.sep).slice(-1)[0] : argv.name
    }
    return argv.name.split(".code")[0].split(path.sep).slice(-1)[0]
}

export function execCmd(command: string): Promise<void> {
    console.log("Executing command: " + command)
    return new Promise((resolve, reject) => {
        const child = exec(command, function(error, stdout, stderr) {
            if (error) {
                console.error("Execution error with code: " + error.code)
                console.log(error)
                reject()
                return
            }
            console.log(`${stdout}`);
            console.log("Exited normally.")
            resolve()
        })
    })
}
