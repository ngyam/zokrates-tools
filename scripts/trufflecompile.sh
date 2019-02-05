#!/bin/bash

cdir="$( cd "$(dirname "$0")" ; pwd -P )"
source ${cdir}/utils.sh

getfullpath $1

mkdir -p ${cdir}/../contracts
cp ${fullpath}/verifier.sol ${cdir}/../contracts
rm -rf "${cdir}/../build/contracts/"
cd ${cdir}/../ && truffle compile && mv ./build/contracts/ ${fullpath}/contractbuild
rm -rf "${cdir}/../contracts/"
