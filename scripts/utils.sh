#!/bin/bash

function getfullpath() {
    fullpath=`realpath -m "$1"`
}

function verifybasicinput() {
    if [[ $# == 0 ]]; then
        echo "Please at least provide a file path."
        exit 1
    fi
}

function verifyname() {
    if [[ $# == 0 ]]; then
        echo "Please provie the name. The name is the name of the folder/.code file of interest in the zokrates container."
        exit 1
    fi
}

function verifywitness() {
    if [[ $# == 0 ]]; then
        echo "Please provie name and witness params.
    name: is the name of the folder/.code file of interest in the zokrates container.
    witness params: witness parameters to the circuit. Should be a space separated list, e.g. \"5 0 15\"."
        exit 1
    fi
}

function getnetwork() {
    if [[ $# == 0 ]]; then
        echo "No network supplied. Defaulting to 'tobalaba'."
        network="tobalaba"
    else
        network=${1}
    fi
}

function verifyall() {
    if [[ $# == 0 ]]; then
        echo "Please provie name and witness params.
    name: is the name of the folder/.code file of interest in the zokrates container.
    witness params: witness parameters to the circuit. Should be a space separated list, e.g. \"5 0 15\"."
        exit 1
    fi
}

function getbasicinput() {
    getfullpath ${1}
    filepath=${fullpath}

    if [[ ${2} == "" ]]; then
        local fbase=${filepath##*/}
        name=${fbase%.*}
    else
        name=${2}
    fi
}

function getname() {
    local fbase=${1##*/}
    name=${fbase%.*}
}

function getcontainer() {
    containers=($(docker ps -a -q -f "ancestor=zokrates" -f "status=running"))
    # assumption: first one in the list of matching
    zokratescontainer=${containers[0]}

    if [[ ${zokratescontainer} == "" ]]; then
        # fallback
        containers=($(docker ps -a -q -f "ancestor=zokrates/zokrates" -f "status=running"))
        zokratescontainer=${containers[0]}
        if [[ ${zokratescontainer} == "" ]]; then
            echo "Running ZoKrates container not found. Please run a zokrates container with an ancestor \"zokrates\" or \"zokrates/zokrates\"."
            exit 1
        fi
    fi

    echo Using container: $zokratescontainer..
}

function execincontainer() {
    docker exec $1 bash -c "$2"
}

function tocontainer() {
    docker cp "${2}" ${1}:"${3}"
}

function fromcontainer() {
    docker cp ${1}:"${2}" "${3}"
}
