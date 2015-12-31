#!/bin/bash
set -ex
#install deps
apt-get update
apt-get install node.js
apt-get install npm

#install botmap
npm install -g
