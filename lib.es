import {
 exec
}
from 'child_process'
import c from 'colors/safe'
import p from 'prompt'


let exports = module.exports = {}

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
exports.userAuth = function() {
 console.warn(c.warn("Note,that you need the permission of the target's owner !"))
 console.warn(c.warn('Are you sure you want to scan and attack: \n' + target))
 console.log(c.prompt('Press y to continue'))
 p.start()
 p.get('input', (err, result) => {
  if (result.input != 'y') {
   process.exit(1)
  }
 })
}

//perform exploit
exports.exploit = function(target) {
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
 console.warn(warn('Note that the following action can bring you to jail ! \n Botmap can not stop the action once it started !'))
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




exports.setup = function() {
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
