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
const script = path.join(__dirname, "..", "..", "..", "scripts", "witness.sh");
exports.command = 'witness <name> [options]';
exports.desc = "Generates the witness for the project in the running ZoKrates container.";
exports.builder = (yargs) => {
    return yargs
        .positional('name', {
        desc: 'Name of the project folder and .code file.',
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
    });
};
exports.handler = function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield witness(argv);
    });
};
function witness(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const fname = utils.extractName(argv);
        const command = `${script} ${fname} ${argv.witness.join(" ")}`;
        yield utils.execCmd(command);
    });
}
exports.witness = witness;
//# sourceMappingURL=witness.js.map