#! /usr/bin/env node
import mc from 'msfnode'
import Task from 'shell-task'
import {execSync} from 'child_process'
import c from 'colors/safe'
import prompt from 'prompt-sync'

const version =  'ALPHA 0.2.0'

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
    console.log(c.info('connected'))
  }

}
//create console fx
function startConsole() {
  let id = ''
  const args =['console.create']
  id = client.exec(args, (err, r) => {
    if(err) {
      console.error(c.error('Could not open a new console \n' + err))
    } else {
      console.log(c.info('Console opened, cleaning it... \n'))

      client.exec(['console.read'], (err, r) => {
        if(err) throw new Error(err)
        console.log(c.info('Done !'))

      })
    }
  })
}

/* SERVER FUNCTIONS */
function startServer() {
  execSync('./msfrpcd -U bot -P botpass -f -a botserver.bot -p :55553', (err, stdout, stderr) => {
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

/* ---- END SERVER FUNCTIONS | SETUP FUNCTIONS ---- */
//add workspace fx
function workspace(console_id) {
  console.log(c.info('Adding workspace...'))
  const args = ['console.write',console_id,'workspace','-a','botmap\n'] //format console.write,id,[command,arguments +\n]
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
  client.exec(['console.write',console_id,'workspace','botmap\n'], (err, r) => {
    if(err) {
      console.error(c.error('Could not switch workspace \ n' + err))
    } else {
      console.log(c.info('workspace switched'))
    }
  })
}

/* ---- END SETUP FUNCTIONS | EXPLOIT FUNCTIONS ---- */

function scan(target) {
  let args = ['console.write', console_id,'db_nmap','-sS','-sV','-sU','-n','-0',target +'\n']
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

/* ---- END EXPLOIT FUNCTIONS | USER MENU ---- */
const userArgs = process.argv.slice(2)

if (userArgs[0] == 'target' || userArgs[0] == '-t') {
  scan(userArgs[1])

  let client = new mc({
    login: 'bot',
    password: 'botpass',
  })

} else if (userArgs[0] == 'about' || userArgs[0] == '-a') {
  console.log(c.info('----------------------------------------------'))
  console.log(c.info('Botmap, a pentest bot ! '))
  console.log(c.info('Author: Coretool'))
  console.log(c.info('License: MIT '))
  console.log(c.info('Note that I am not responsible for \n what you do with botmap'))
  console.log(c.info('Visit github.com/coretool/botmap for more !'))
  console.log(c.info('----------------------------------------------'))

} else if (userArgs[0] == 'help' || userArgs[0] == '-h') {
  console.log('Help screen goes here') //to do add help

} else if(userArgs[0] == 'setup' || userArgs[0] == '-s') {
  console.log(c.info('Seeting up botmap ! \n Note that you only have to use this once per release'))
  execSync('clear') //just to get rid of the ugly text
  console.log(c.info('Starting server...'))
  startServer()
  console.log(c.info('Adding workspace...'))
  workspace()
  stopServer()
  console.log(c.info('Done ! '))

} else if (userArgs[0] == 'start') {
  console.log(c.info('starting server'))
  startServer()
  console.log(c.info('Do not forget to stop the server when you are done ! :-) '))

} else if (userArgs[0] == 'stop') {
  console.log(c.info('stopping server'))
  stopServer()
  console.log(c.info('Done !'))

} else {
  console.log(c.help('botmap version: ' + version + 'use "botmap -h"'))
}
