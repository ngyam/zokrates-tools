
SHELL=/bin/bash
cleanup?=0
network?=dev

# witness is passed as e.g.: witness="10 2 5"

copy:
	./copy.sh ${filepath} ${name}

compile:
	./compile.sh ${name}

setup:
	./setup.sh ${name}

proof:
	./proof.sh ${name}

witness:
	./witness.sh ${name} $(witness)

witnessoutput:
	./witnessoutput.sh ${name}

verifier:
	./verifier.sh ${name}

generate:
	./generate.sh ${name} $(witness)

clear:
	./clear.sh ${name}

clean:
	make clear

mightcleanup:
	@if [[ ${cleanup} == 1 ]] || [[ ${cleanup} == true ]]; then; make clear; fi;

retrieve:
	./retrieve.sh ${outputfolder} ${name}
	make mightcleanup

compilecontract:
	./trufflecompile.sh ${name} 

deploy:
	./deploy.sh $(network)

compiledeploy:
	make compilecontract
	make deploy

easycopyproof:
	./easycopyproof.sh ${outputfolder} ${name}

compiledeploy:
	make compiledeploy

full:
	make copy
	make generate
	make retrieve
	make easycopyproof

all:
	make full
	make compiledeploy
