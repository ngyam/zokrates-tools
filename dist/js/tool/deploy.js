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
const Web3 = require("web3");
const fs = require("fs");
exports.command = 'deploy <name> [dir] [options]';
exports.desc = "Deploys verifier from the local project folder. No truffle, just web3.";
exports.builder = (yargs) => {
    return yargs
        .positional('name', {
        desc: 'Name of the project folder.',
        type: 'string',
        alias: "n",
        default: undefined
    })
        .positional("dir", {
        type: 'string',
        desc: "The local dir, where the project folder was copied from the container.",
        alias: ["o", "d"],
        default: path.join(__dirname, "..", "..", "..", "build", "/")
    })
        .option("network", {
        desc: 'Name of the network defined in the truffle.js file.',
        type: 'string',
        alias: "nw",
        default: 'tobalaba',
        demandOption: false
    })
        .option('from', {
        desc: 'Deployer account address. Defaults to the first account of the local accounts list.',
        demandOption: false,
        type: 'string',
        alias: "f",
        default: undefined
    })
        .option('rpc', {
        type: 'string',
        desc: "HTTP RPC API endpoint. Defaults to http://localhost:8545",
        demandOption: false,
        alias: "r",
        default: "http://localhost:8545"
    })
        .option('gas', {
        type: 'number',
        desc: "Gas supplied to deployment transaction in wei.",
        demandOption: false,
        alias: "g",
        default: 7000000
    });
};
exports.handler = function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield deploy(argv);
    });
};
function deploy(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const fname = utils.extractName(argv);
        const pdir = path.join(path.resolve(process.cwd(), argv.dir), fname);
        console.log("Looking for verifier..");
        const ContractJSON = JSON.parse(fs.readFileSync(path.join(pdir, "contractbuild", "Verifier.json"), 'utf-8'));
        console.log("Verifier found!");
        const web3 = new Web3(argv.rpc);
        let from = argv.from;
        if (undefined === from) {
            let localAccounts = yield web3.eth.getAccounts();
            if (localAccounts !== undefined && localAccounts.length !== 0) {
                web3.eth.defaultAccount = localAccounts[0];
                from = web3.eth.defaultAccount;
            }
        }
        console.log("Deploying from " + from + "..");
        let Contract = new web3.eth.Contract(ContractJSON.abi, { data: ContractJSON.bytecode });
        let c = yield Contract.deploy().send({ from: from, gas: argv.gas });
        console.log("Verifier deployed at:");
        console.log(c.options.address);
    });
}
exports.deploy = deploy;
//# sourceMappingURL=deploy.js.map