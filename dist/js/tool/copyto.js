"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils = require("../utils");
const script = path.join(__dirname, "..", "..", "..", "scripts", "copy.sh");
exports.command = 'copyto <filepath> [options]';
exports.desc = "Copies a .code file into its created project folder in the running ZoKrates container.";
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
    });
};
exports.handler = function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield copyto(argv);
    });
};
function copyto(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const fname = utils.extractName(argv);
        const command = `${script} ${path.resolve(process.cwd(), argv.filepath)} ${fname}`;
        yield utils.execCmd(command);
    });
}
exports.copyto = copyto;
//# sourceMappingURL=copyto.js.map