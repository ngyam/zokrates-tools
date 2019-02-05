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
const script = path.join(__dirname, "..", "..", "..", "scripts", "generate.sh");
exports.command = 'generate <name> [options]';
exports.desc = "Performs a full generation of a project inside the ZoKrates container: compile, setup, witness, proof and generate verifier contract. All the generated files are located inside the project folder.";
exports.builder = (yargs) => {
    return yargs
        .positional('name', {
        desc: 'Name of the project folder and .code file in the container.',
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
        return yield generate(argv);
    });
};
function generate(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const fname = utils.extractName(argv);
        const command = `${script} ${fname} ${argv.witness.join(" ")}`;
        yield utils.execCmd(command);
    });
}
exports.generate = generate;
//# sourceMappingURL=generate.js.map