#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

verifyname "$@"
getname "$@"

echo "Name: ${name}"

getcontainer

execincontainer ${zokratescontainer} "cd /home/zokrates \
                                        && ./zokrates setup -i ${name}/out -m ${name}/variables.inf -p ${name}/proving.key -v ${name}/verification.key"
