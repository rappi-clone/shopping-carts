#!/bin/bash
sleep 5s
if [[ $STOPPED !=  "true" ]]; then
	echo "NOT STOPPED ENV VARIABLE"
	DIR="./node_modules"
	if [[ -d $DIR ]]; then
		echo "NODE MODULES EXIST"
		if [[ $INSTALL_MODULES = "true" ]]; then
			echo "FORCE INSTALLING NODE MODULES"
			npm install
		fi
	else
		echo "NODE MODULES DONT EXIST. INSTALLING NODE MODULES"
		npm install
	fi

	if [[ $DB_SETUP = "true" ]]; then
		echo "FORCE RESETTING SEQUELIZE DATABASE AND RUNNING SERVER"
		node server.js
	else
		echo "RUNNING SERVER"
		node server.js
	fi
fi


