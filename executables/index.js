#! /usr/bin/env node
'use strict';

var _msfnode = require('msfnode');

var _msfnode2 = _interopRequireDefault(_msfnode);

var _shellTask = require('shell-task');

var _shellTask2 = _interopRequireDefault(_shellTask);

var _child_process = require('child_process');

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _promptSync = require('prompt-sync');

var _promptSync2 = _interopRequireDefault(_promptSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = 'ALPHA 0.2.0';

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
  console.log(_safe2.default.prompt('Press "y" to continue | "n" to stop!'));
  var input = _promptSync2.default.prompt();

  if (input != 'y') {
    console.log(_safe2.default.info('Maybe a wise decision..'));
    process.exit(0);
  }
}

client.on('connected', onConnect);

//do this on connect
function onConnect(err, token) {
  if (err) {
    console.error(_safe2.default.error('Could not connect \n' + err));
    process.exit(1);
  } else {
    console.log(_safe2.default.info('connected'));
  }
}
//create console fx
function startConsole() {
  var id = '';
  var args = ['console.create'];
  id = client.exec(args, function (err, r) {
    if (err) {
      console.error(_safe2.default.error('Could not open a new console \n' + err));
    } else {
      console.log(_safe2.default.info('Console opened, cleaning it... \n'));

      client.exec(['console.read'], function (err, r) {
        if (err) throw new Error(err);
        console.log(_safe2.default.info('Done !'));
      });
    }
  });
}

/* SERVER FUNCTIONS
function startServer() {
  console.log(c.info('Starting server ! '))
  execSync('msfrpcd -U bot -P botpass -f ', (err, stdout, stderr) => {
    if(err || stderr) {
    const error = err || stderr
    console.error(c.error('Could not start server \n' + error ))
   } else {
     console.log(c.info('started server'))
   }
  })
}

function stopServer() {
  client.exec('core.stop', (err, r) => {
    if(err) {
      console.error(c.error('Could not stop server ! \n ' + err))
    } else {
      console.log(c.info('server halted'))
    }
  })
}
*/
/* ---- END SERVER FUNCTIONS | SETUP FUNCTIONS ---- */
//add workspace fx
function workspace(console_id) {
  console.log(_safe2.default.info('Adding workspace...'));
  var args = ['console.write', console_id, 'workspace', '-a', 'botmap\n']; //format console.write,id,[command,arguments +\n]
  client.exec(args, function (err, r) {
    if (err) {
      console.error(_safe2.default.error('Could not add workspace \n' + err));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('workspace added'));
    }
  });
}

//switch workspace fx
function switchWorkspace(console_id) {
  console.log(_safe2.default.info('Switching workspace...'));
  client.exec(['console.write', console_id, 'workspace', 'botmap\n'], function (err, r) {
    if (err) {
      console.error(_safe2.default.error('Could not switch workspace \ n' + err));
    } else {
      console.log(_safe2.default.info('workspace switched'));
    }
  });
}

/* ---- END SETUP FUNCTIONS | EXPLOIT FUNCTIONS ---- */

function scan(target) {
  var args = ['console.write', console_id, 'db_nmap', '-sS', '-sV', '-sU', '-n', '-0', target + '\n'];
  client.exec(args, function (err, r) {
    if (err) {
      console.error(_safe2.default.error('Could not scan target [' + target + ']' + err));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('performed scan'));
      var _args = ['console.read', console_id];
      client.exec(_args, function (err, res) {
        if (err) {
          console.error(_safe2.default.error('Could not read data ! \n' + err));
          process.exit(1);
        } else {
          console.log(res);
        }
      });
    }
  });
}

var client = new _msfnode2.default({
  login: 'bot',
  password: 'botpass'
});

/* ---- END EXPLOIT FUNCTIONS | USER MENU ---- */
var userArgs = process.argv.slice(2);

if (userArgs[0] == 'target' || userArgs[0] == '-t') {
  scan(userArgs[1]);

  var _client = new _msfnode2.default({
    login: 'bot',
    password: 'botpass'
  });
} else if (userArgs[0] == 'about' || userArgs[0] == '-a') {
  console.log(_safe2.default.info('----------------------------------------------'));
  console.log(_safe2.default.info('Botmap, a pentest bot ! '));
  console.log(_safe2.default.info('Author: Coretool'));
  console.log(_safe2.default.info('License: MIT '));
  console.log(_safe2.default.info('Note that I am not responsible for \n what you do with botmap'));
  console.log(_safe2.default.info('Visit github.com/coretool/botmap for more !'));
  console.log(_safe2.default.info('----------------------------------------------'));
} else if (userArgs[0] == 'help' || userArgs[0] == '-h') {
  console.log('Help screen goes here'); //to do add help
} else if (userArgs[0] == 'setup' || userArgs[0] == '-s') {
    console.log(_safe2.default.info('Seeting up botmap ! \n Note that you only have to use this once per release'));
    (0, _child_process.execSync)('clear'); //just to get rid of the ugly text
    console.log(_safe2.default.info('Starting server...'));
    console.log(_safe2.default.info('Adding workspace...'));
    workspace();
    stopServer();
    console.log(_safe2.default.info('Done ! '));
  } else {
    console.log(_safe2.default.help('botmap version: ' + version + 'use "botmap -h"'));
  }