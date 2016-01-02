## Botmap ##
Botmap is a *nmap* and *metasploit* bot.

## BIG UPDATE ##

A bit update is currently in development! The commands mentioned below won't work at the moment...

## Introduction ##

    botmap target [target ip]
   This is the command to start botmap. Once started, botmap will launch a complete scan of the target (save it to the db ) and try the available exploits in the metasploit db.

    botmap setup
 This will set up a workspace in the database to which botmap will switch to it everytime you fire it up.

    botmap about
    botmap info
Displays some info about botmap.

    botmap help
    botmap -h
   Displays the help text.

## Installation ##
You need node.js version 0.12 or higher. See the wiki for more information.
Open a console window and type:

  git clone http://github.com/coretool/botmap.git
  cd botmap
  sudo npm install -g
  sudo ln -s /usr/bin/nodejs /usr/bin/node

## Note ##
Only use this with permission of the targets owner ! If you don't have his or her permission you will do something illegal ! I am not responsible for what **you**
do with botmap.
