import * as path from 'path'
import * as utils from '../utils'
import * as Web3 from 'web3'
import * as fs from 'fs'

exports.command = 'verify <address> [options]'
exports.desc = "Verifies a proof with the deployed verifier contract, using a local proof.json file."
exports.builder = (yargs) => {
    return yargs
        .positional('address', {
            desc: 'Address of the deployed verifier contract. Hex-string starting with 0x.',
            type: 'string',
            alias: "a",
            default: undefined
        })
        .option("proof", {
            type: 'string',
            desc: "The path to the local proof.json file. If not given, --dir and --name flags are obligatory. It is also assumed that the file has the exact name 'proof.json'.",
            demandOption: false,
            alias: ["p"],
            default: undefined
        })
        .option("jsonabi", {
            type: 'string',
            desc: "The path to the verifier JSON-ABI file. If not given, --dir and --name flags are obligatory. It is also assumed that the file has the exact name 'Verifier.json' in the 'contractbuild/' project folder.",
            demandOption: false,
            alias: ["j"],
            default: undefined
        })
        .option("dir", {
            type: 'string',
            desc: "The local dir, where the project folder was copied from the container. Have to be used with the --name option.",
            demandOption: false,
            alias: ["o", "d"],
            default: path.join(__dirname, "..","..","..","build","/")
        })
        .option('name', {
            desc: 'Name of the local project/project folder. Have to be used with the --dir option.',
            demandOption: false,
            type: 'string',
            alias: "n",
            default: undefined
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
    return await verify(argv)
  }


function getInputData(proofJson) {
    let arr = [];
    Object.keys(proofJson.proof).forEach((key) => {
        arr.push(proofJson.proof[key])
    });
    arr.push(proofJson.input)
    return arr
}

function approveArgv(argv) {
    if (argv.proof === undefined && argv.name === undefined) {
        throw Error("You either specify the path to the proof.json (--proof), or give a --dir and --name.")
    }

    if (argv.jsonabi === undefined && argv.name === undefined) {
        throw Error("You either specify the path to the JSON-ABI of the verifier (--jsonabi), or give a --dir and --name.")
    }
}

export async function verify(argv) {

    approveArgv(argv)
    
    console.log("Grabbing verifier..")

    const web3 = new Web3(argv.rpc)

    let from = argv.from
    if (undefined === from) {
        let localAccounts = await web3.eth.getAccounts()
        if (localAccounts !== undefined && localAccounts.length !== 0) {
            web3.eth.defaultAccount = localAccounts[0]
            from = web3.eth.defaultAccount
        }
    }

    let ContractJSON
    if (argv.jsonabi !== undefined) {
        ContractJSON = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), argv.jsonabi), 'utf-8'))
    } else {
        const fname = utils.extractName(argv)
        const pdir = path.join(path.resolve(process.cwd(), argv.dir),fname)
        ContractJSON = JSON.parse(fs.readFileSync(path.join(pdir,"contractbuild","Verifier.json"), 'utf-8'))
    }

    let contract = new web3.eth.Contract(ContractJSON.abi, argv.address, {data: ContractJSON.bytecode})

    console.log("Verifier found!")

    let proofJson
    if (argv.proof !== undefined) {
        proofJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), argv.proof), 'utf-8'))
    } else {
        const fname = utils.extractName(argv)
        const pdir = path.join(path.resolve(process.cwd(), argv.dir),fname)
        proofJson = JSON.parse(fs.readFileSync(path.join(pdir,"proof.json"), 'utf-8'))
    }

    console.log("Verifying proof:")
    console.log(JSON.stringify(proofJson))
    
    let result = await contract.methods.verifyTx(...getInputData(proofJson))
        .send({from: from, gas: argv.gas})
    
    console.log("Result:")
    console.log(JSON.stringify(result, null, 2))
}
