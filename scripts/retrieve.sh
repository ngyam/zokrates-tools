#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

verifybasicinput "$@"
getbasicinput "$@"
getname $2

echo "Output dir: ${filepath}"
echo "Name: ${name}"

getcontainer
mkdir -p ${filepath}
fromcontainer ${zokratescontainer} "/home/zokrates/${name}" ${filepath}
