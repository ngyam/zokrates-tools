
import * as path from 'path'
import * as utils from '../utils'
import * as Web3 from 'web3'
import * as fs from 'fs'

exports.command = 'deploy <name> [dir] [options]'
exports.desc = "Deploys verifier from the local project folder. No truffle, just web3."
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
            default: path.join(__dirname, "..","..","..","build","/")
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
        })
}

exports.handler = async function (argv) {
  return await deploy(argv)
}

export async function deploy(argv) {
    const fname = utils.extractName(argv)
    const pdir = path.join(path.resolve(process.cwd(), argv.dir),fname)
    
    console.log("Looking for verifier..")

    const ContractJSON = JSON.parse(fs.readFileSync(path.join(pdir,"contractbuild","Verifier.json"), 'utf-8'))
    
    console.log("Verifier found!")

    const web3 = new Web3(argv.rpc);

    let from = argv.from;
    if (undefined === from) {
        let localAccounts = await web3.eth.getAccounts();
        if (localAccounts !== undefined && localAccounts.length !== 0) {
            web3.eth.defaultAccount = localAccounts[0];
            from = web3.eth.defaultAccount;
        }
    }

    console.log("Deploying from " + from + "..")

    let Contract = new web3.eth.Contract(ContractJSON.abi, {data: ContractJSON.bytecode});
    let c = await Contract.deploy().send({from: from, gas: argv.gas});
    console.log("Verifier deployed at:")
    console.log(c.options.address)
}
