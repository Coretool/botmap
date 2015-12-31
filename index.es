import bm from './lib.min.js'
import fs from 'fs'
import c from 'colors/safe'

c.setTheme({silly:'rainbow',input:'grey',verbose:'cyan',prompt:'grey',info:'green',data:'grey',help:'cyan',warn:'yellow',debug:'blue',red:'red'})
let userArgs = process.argv.slice(2)
let target
 //argument handling, a bit of small talk, blabla
if (userArgs[0] == 'target' || userArgs[0] == '-t') {
  //botmap target [arget]
 target = userArgs[1]
 bm.userAuth()
 bm.exploit(target)
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
 bm.setup()
} else {
  //botmap [wrong args]
 console.error(c.red('Unknownen Argumen(s)'))
 process.exit(1)
}
