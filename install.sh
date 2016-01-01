#!/bin/bash
set -ex
#install deps
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install --yes nodejs
apt-get update
apt-get install npm -y

#install botmap
ln -s /usr/bin/nodejs /usr/bin/node
npm install -g
