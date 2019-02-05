#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

verifyname "$@"
getname "$@"

echo "Name: ${name}"

getcontainer
execincontainer ${zokratescontainer} "cd /home/zokrates \
                                        && ./zokrates generate-proof -i ${name}/variables.inf -j ${name}/proof.json -p ${name}/proving.key -w ${name}/witness"
                                        