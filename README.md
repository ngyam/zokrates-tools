# ZoKrates dev tools

A command line toolkit for easier dev flow with [ZoKrates](https://github.com/Zokrates/ZoKrates), so you do not have to copy files, execute each command step by step, deploy the contract, and verify manually. It is a TS wrapper around a set of bash scripts which I wrote while playing around with ZoKrates. I like to automate stuff.

Since this is a first dirty version, bugs can be expected. Feel free to open issues or contribute.

## Maintainers
**Primary**: Adam Nagy (@ngyam)

## Quickstart

```bash
npm install -g zokrates-tools
```
**!** Make sure that a ZoKrates container is running, either named as `zokrates` or `zokrates/zokrates`. The scripts are looking for it, and automatically fetch the container ID.

Then just use the `--help` flag for further description of the commands.
```bash
zoktools --help
```
```
> zoktools <command>

Commands:
  zoktools compile <name> [options]         Compiles the .code file in the
                                            running ZoKrates container.
  zoktools copyfrom <name> [outputdir]      Retrieves the project folder & files
  [options]                                 from the running ZoKrates container.
  zoktools copyto <filepath> [options]      Copies a .code file into its created
                                            project folder in the running
                                            ZoKrates container.
  zoktools deploy <name> [dir] [options]    Deploys verifier from the local
                                            project folder. No truffle, just
                                            web3.
  zoktools easycopyproof <name> [dir]       Parses the proof in the local
  [options]                                 project folder so that it is easier
                                            to copy-paste manually.
  zoktools full <filepath> [outputdir]      Performs a full cycle: copy to
  [options]                                 container -> generate (compile,
                                            setup, witness, proof, verifier) ->
                                            copy from container.
  zoktools generate <name> [options]        Performs a full generation of a
                                            project inside the ZoKrates
                                            container: compile, setup, witness,
                                            proof and generate verifier
                                            contract. All the generated files
                                            are located inside the project
                                            folder.
  zoktools proof <name> [options]           Generates the proof for the project
                                            in the running ZoKrates container.
  zoktools setup <name> [options]           Performs the trusted setup for the
                                            project in the running ZoKrates
                                            container.
  zoktools trufflecompile <name> [dir]      Compiles the verifier in the local
  [options]                                 project folder. The output is placed
                                            in the local project's
                                            'contractbuild/' folder.
  zoktools verifier <name> [options]        Generates the verifier contract for
                                            the project in the running ZoKrates
                                            container.
  zoktools verify <address> [options]       Verifies a proof with the deployed
                                            verifier contract, using a local
                                            proof.json file.
  zoktools version                          Prints version number.
  zoktools witness <name> [options]         Generates the witness for the
                                            project in the running ZoKrates
                                            container.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

```
You can invoke `--help` for each command separately.
```bash
zoktools full --help
```
```
> zoktools full <filepath> [outputdir] [options]

Performs a full cycle: copy to container -> generate (compile, setup, witness,
proof, verifier) -> copy from container.

Positionals:
  filepath, f   The local path to the .code source file.     [string] [required]
  outputdir, o  The output dir (local), where the project folder will be copied
                from the container.                           [string] [default:
              "/home/aznagy/.npm-global/lib/node_modules/zokrates-tools/build/"]

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --name, -n     Name of the project folder and .code file to be created in the
                 container. By default it is taken from the input .code
                 filename. You can rename it though.                    [string]
  --witness, -w  List of witness params. Positional arguments to the
                 corresponsing ZoKrates command.[array] [required] [default: []]
```

## An example
Using the supplied [dummy.code](./circuits/dummy.code) circuit for testing:
```bash
zoktools full ./circuits/dummy.code -w 5 6 -o ~/build/zokbuilds
```
1. This command copies the circuit file into the running ZoKrates container, into a created project folder `~/dummy`, under the name `dummy.code`. This can be changed with the `--name` flag, otherwise it is taken from the circuit filename.
2. The command invokes the compile, setup, witness, proof and verifier scripts. For the witness generation, the positional input params need to be passed. In this case it is 5 and 6. The files generated in each step stay in the project folder inside the container.
    ```
    dummy
    ├── dummy.code
    ├── out
    ├── out.code
    ├── proof.json
    ├── proving.key
    ├── variables.inf
    ├── verification.key
    ├── verifier.sol
    └── witness
    ```
3. Copies the whole project folder from the container to a specified location, given by the `-o` flag.

```bash
zoktools trufflecompile dummy --dir ~/build/zokbuilds
```
 - This command compiles the verifier.sol file in the project folder which was copied from the container in the previous step. The JSON-ABIs are placed in the `dummy/contractbuild/` folder. This step uses `truffle` for now but I will update it to a truffle free version later so it is not an annoying dependency.

```bash
zoktools deploy dummy --dir ~/build/zokbuilds

> Looking for verifier..
Verifier found!
Deploying from 0x0052569B2d787bB89d711e4aFB56F9C1E420a2a6..
Verifier deployed at:
0x49dce4FCADde346D7ff727b8a929F4e06f367631
```
 - The compiled verifier contract is deployed. Access to an ethereum node is needed. You are free to specify `--from`, `--rpc` or `--gas`.

```bash
zoktools verify 0x49dce4FCADde346D7ff727b8a929F4e06f367631 --dir ~/build/zokbuilds --name dummy
```
- In this step we are verifying the proof.json with our deployed verifier contract.

## Prerequisites

 - node, npm
 - truffle (I have it globally by ```npm install -g truffle@v4.1.15```)

## Contributing

Please read [contributing](./CONTRIBUTING.md) and our [code of conduct](./CODE_OF_CONDUCT.md) for details.

## Getting started (as a dev)

### Cloning the repo

```bash
git clone https://github.com/ngyam/zokrates-tools.git
cd zokrates-tools
npm install -D
npm run postinstall # patch for web3 js beta.37 
npm install -g truffle@v4.1.15 # if needed
```

### Testing
Manually so far.

Make sure to start your container by either fetching it from dockerhub:
```bash
docker run -ti zokrates/zokrates:latest
# or: npm run start
# from the project folder
```
or building yourself from the checked out offical repo:
```bash
docker build -t zokrates .
docker run -ti zokrates /bin/bash
```
It is essential to tag it as `zokrates` in this case, cause the scripts are looking for it.

## Versioning

[SemVer](http://semver.org/).

## License

This project is licensed under MIT - see the [LICENSE](./LICENSE) file for details.
