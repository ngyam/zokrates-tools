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
const script = path.join(__dirname, "..", "..", "..", "scripts", "trufflecompile.sh");
exports.command = 'trufflecompile <name> [dir] [options]';
exports.desc = "Compiles the verifier in the local project folder. The output is placed in the local project's 'contractbuild/' folder.";
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
        default: path.join(__dirname, "..", "..", "..", "build", "/")
    });
};
exports.handler = function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield trufflecompile(argv);
    });
};
function trufflecompile(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const fname = utils.extractName(argv);
        const pdir = path.join(path.resolve(process.cwd(), argv.dir), fname);
        const command = `${script} "${pdir}" ${fname}`;
        yield utils.execCmd(command);
    });
}
exports.trufflecompile = trufflecompile;
//# sourceMappingURL=trufflecompile.js.map