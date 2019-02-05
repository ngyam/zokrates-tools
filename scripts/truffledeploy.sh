#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

getfullpath $1
echo ${fullpath}
mkdir -p ${cdir}/../build/contracts
mkdir -p ${cdir}/../contracts
cp -a "${fullpath}/contractbuild/." "${cdir}/../build/contracts/"
cp "${fullpath}/verifier.sol" ${cdir}/../contracts/ 
cd "${cdir}/.." && truffle migrate --network ${2}
