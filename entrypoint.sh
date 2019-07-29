#!/bin/bash
if [ -z "$production"]
then
	sleep 60
	node server.js
else
	sleep 60
	node server.js
fi
