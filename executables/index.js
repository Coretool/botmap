'use strict';

var _libMin = require('./lib.min.js');

var _libMin2 = _interopRequireDefault(_libMin);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_safe2.default.setTheme({ silly: 'rainbow', input: 'grey', verbose: 'cyan', prompt: 'grey', info: 'green', data: 'grey', help: 'cyan', warn: 'yellow', debug: 'blue', red: 'red' });
var userArgs = process.argv.slice(2);
var target = undefined;
//argument handling, a bit of small talk, blabla
if (userArgs[0] == 'target' || userArgs[0] == '-t') {
  //botmap target [arget]
  target = userArgs[1];
  _libMin2.default.userAuth();
  _libMin2.default.exploit(target);
} else if (userArgs[0] == 'info' || userArgs[0] == 'about') {
  //botmap info | botmap about
  console.log(_safe2.default.info('------------------------------------------'));
  console.log(_safe2.default.info('Author: Coretool'));
  console.log(_safe2.default.info('Version: 0.1.0'));
  console.log(_safe2.default.info('License: MIT'));
  console.log(_safe2.default.info('Note that I am not responsible \n for what you do with botmap.'));
  console.log(_safe2.default.info('------------------------------------------'));
  process.exit(0);
} else if (userArgs[0] == 'help' || userArgs[0] == '-h') {
  //botmap help | botmap -h
  console.log(_safe2.default.help('------------------------------------------'));
  console.log(_safe2.default.help('botmap [command] [argument] where: '));
  console.log(_safe2.default.help('command is one of the following\n target [traget ip]: set target, shoot and forget \n about : display the info about botmap \n clean : to clean the temp.json \n help to display this menu '));
  console.log(_safe2.default.help('------------------------------------------'));
} else if (userArgs[0] == 'setup') {
  //botmap setup
  _libMin2.default.setup();
} else {
  //botmap [wrong args]
  console.error(_safe2.default.red('Unknownen Argumen(s)'));
  process.exit(1);
}