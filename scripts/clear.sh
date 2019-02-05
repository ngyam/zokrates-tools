#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

verifyname "$@"
getname "$@"

echo "Name: ${name}"

getcontainer
execincontainer ${zokratescontainer} "rm -rf /home/zokrates/${name}/"
