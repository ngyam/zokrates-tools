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
const script = path.join(__dirname, "..", "..", "..", "scripts", "retrieve.sh");
exports.command = 'copyfrom <name> [outputdir] [options]';
exports.desc = "Retrieves the project folder & files from the running ZoKrates container.";
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
        default: path.join(__dirname, "..", "..", "..", "build", "/")
    });
};
exports.handler = function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield copyfrom(argv);
    });
};
function copyfrom(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const fname = utils.extractName(argv);
        const command = `${script} ${path.resolve(process.cwd(), argv.outputdir)} ${fname}`;
        yield utils.execCmd(command);
    });
}
exports.copyfrom = copyfrom;
//# sourceMappingURL=copyfrom.js.map