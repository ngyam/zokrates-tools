#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

verifywitness "$@"
getname "$@"

echo "Name: ${name}"

getcontainer

shift
execincontainer ${zokratescontainer} "cd /home/zokrates \
                                        && ./zokrates compute-witness -i ${name}/out -o ${name}/witness -a $*"
