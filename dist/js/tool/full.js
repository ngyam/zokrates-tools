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
const scriptCopy = path.join(__dirname, "..", "..", "..", "scripts", "copy.sh");
const scriptGen = path.join(__dirname, "..", "..", "..", "scripts", "generate.sh");
const scriptRetrieve = path.join(__dirname, "..", "..", "..", "scripts", "retrieve.sh");
const scriptEzcp = path.join(__dirname, "..", "..", "..", "scripts", "easycopyproof.sh");
exports.command = 'full <filepath> [outputdir] [options]';
exports.desc = "Performs a full cycle: copy to container -> generate (compile, setup, witness, proof, verifier) -> copy from container.";
exports.builder = (yargs) => {
    return yargs
        .positional("filepath", {
        type: 'string',
        desc: "The local path to the .code source file.",
        alias: "f",
        default: undefined
    })
        .positional("outputdir", {
        type: 'string',
        desc: "The output dir (local), where the project folder will be copied from the container.",
        alias: "o",
        default: path.join(__dirname, "..", "..", "..", "build", "/")
    })
        .option('name', {
        desc: 'Name of the project folder and .code file to be created in the container. By default it is taken from the input .code filename. You can rename it though.',
        demandOption: false,
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
        return yield full(argv);
    });
};
function full(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const fname = utils.extractName(argv);
        const filepath = path.resolve(process.cwd(), argv.filepath);
        const cpy = `${scriptCopy} ${filepath} ${fname}`;
        yield utils.execCmd(cpy);
        const gen = `${scriptGen} ${fname} ${argv.witness.join(" ")}`;
        yield utils.execCmd(gen);
        const retr = `${scriptRetrieve} ${path.resolve(process.cwd(), argv.outputdir)} ${fname}`;
        yield utils.execCmd(retr);
        const ezcp = `${scriptEzcp} "${path.resolve(process.cwd(), argv.outputdir)}" ${fname}`;
        yield utils.execCmd(ezcp);
    });
}
exports.full = full;
//# sourceMappingURL=full.js.map