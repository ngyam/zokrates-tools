#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

verifywitness "$@"
getname "$@"

echo "Name: ${name}"

getcontainer

shift
execincontainer ${zokratescontainer} "cd /home/zokrates \
                                        && ./zokrates compile -i ${name}/${name}.code -o ${name}/out \
                                        && ./zokrates setup -i ${name}/out -m ${name}/variables.inf -p ${name}/proving.key -v ${name}/verification.key \
                                        && ./zokrates compute-witness -i ${name}/out -o ${name}/witness -a $* \
                                        && ./zokrates generate-proof -i ${name}/variables.inf -j ${name}/proof.json -p ${name}/proving.key -w ${name}/witness \
                                        && ./zokrates export-verifier -i ${name}/verification.key -o ${name}/verifier.sol"
