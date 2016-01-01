#! /usr/bin/env node
import mc from 'metasploitJSClient'
import { execSync } from 'child_process'
import c from 'colors/safe'
import prompt from 'prompt-sync'

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
 console.log(c.prompt('Press y to continue'))
let input = prompt.prompt()

if (input != 'y') {
  console.log(c.info('Maybe a wise decision..'))
  process.exit(1)
  }
}

let onConnect = function(err, token) {
  if(err) {
    console.error(error('Could not connect \n' +err))
    process.exit(1)
  } else {
    console.log(info('connected'))
  }

}

//setup functions
function startServer( {
  execSync('cd') //TODO add framework path
  execSync(' ruby msfrpcd -U bot -P botpass -f -a botserver.bot -p :55553', (err,r) => {
    if(err) {
      console.error(c.error('Could not start server \n' +err))
      process.exit(1)
    }
    console.log(c.info('botserver.bot now listening on 35553'))
  })
})
function workspace() {
  console.log(c.info('Adding workspace...'))
  client.exec('workspace -a botmap', (err, r) => {
    if(err) {
      console.log(c.error('Could not add workspace \n' +err))
      process.exit(1)
    } else {
      console.log(c.info('workspace added'))
    }
  } )
}

function exploit(target) {
  client.exec('db_nmap -sS -sV -sU -n -O' +target)
}

const client = new mc({
  login: 'bot',
  password: 'botpass',
})

client.on('connected', onConnect)
