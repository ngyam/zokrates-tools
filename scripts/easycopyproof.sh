#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

getfullpath "$@"
shift
getname "$@"

cat "${fullpath}/${name}/proof.json" | jq ".proof[] | values" -c > "${fullpath}/${name}/easycopyproof.txt"
cat "${fullpath}/${name}/proof.json" | jq ".input" -c >> "${fullpath}/${name}/easycopyproof.txt"
