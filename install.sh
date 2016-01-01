#!/bin/bash
set -ex
#install deps
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
apt-get update
apt-get install --yes nodejs
apt-get install npm -y --fix-missing

#install botmap
nvm install 5.0
ln -s /usr/bin/nodejs /usr/bin/node
npm install -g
botmap about 
