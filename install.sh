#!/bin/bash
set -ex
apt-get update
apt-get install node.js
apt-get install npm

npm install botmap -g
reboot
