#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

verifywitness "$@"
getname "$@"

echo "Name: ${name}"

getcontainer

shift
execincontainer ${zokratescontainer} "cd /home/zokrates/${name} \
                                        && grep '~out' witness"
