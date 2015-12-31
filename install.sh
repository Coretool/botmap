#!/bin/bash
set -ex
#install deps
apt-get update
apt-get install node.js
apt-get install npm

#install botmap
git clone https://coretool@bitbucket.org/coretool/botmap.git
npm install -g
