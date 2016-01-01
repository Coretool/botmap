#!/bin/bash
set -ex
#install deps
apt-get update
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install --yes nodejs
apt-get install npm -y --fix-missing

#install botmap
ln -s /usr/bin/nodejs /usr/bin/node
npm install -g
