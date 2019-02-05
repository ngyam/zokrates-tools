#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

verifybasicinput "$@"
getbasicinput "$@"

echo "File path: ${filepath}"
echo "Name: ${name}"

getcontainer
execincontainer ${zokratescontainer} "mkdir -p /home/zokrates/${name}"
tocontainer ${zokratescontainer} ${filepath} "/home/zokrates/${name}/${name}.code"
