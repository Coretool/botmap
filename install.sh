#!/bin/bash
set -ex
#install deps
apt-get update
apt-get install node.js -y
apt-get install npm -y

#install botmap
npm install -g
