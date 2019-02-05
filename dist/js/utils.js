"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const child_process_1 = require("child_process");
function extractName(argv) {
    if (argv.filepath !== undefined) {
        return (argv.name === undefined) ? argv.filepath.split(".code")[0].split(path.sep).slice(-1)[0] : argv.name;
    }
    return argv.name.split(".code")[0].split(path.sep).slice(-1)[0];
}
exports.extractName = extractName;
function execCmd(command) {
    console.log("Executing command: " + command);
    return new Promise((resolve, reject) => {
        const child = child_process_1.exec(command, function (error, stdout, stderr) {
            if (error) {
                console.error("Execution error with code: " + error.code);
                console.log(error);
                reject();
                return;
            }
            console.log(`${stdout}`);
            console.log("Exited normally.");
            resolve();
        });
    });
}
exports.execCmd = execCmd;
//# sourceMappingURL=utils.js.map