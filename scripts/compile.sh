#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

verifyname "$@"
getname "$@"

echo "Name: ${name}"

getcontainer
execincontainer ${zokratescontainer} "cd /home/zokrates \
                                      && ./zokrates compile -i ${name}/${name}.code -o ${name}/out"