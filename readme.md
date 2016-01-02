## Botmap ##
Botmap is a *nmap* and *metasploit* bot.

## Changelog ##

0.2.0 Big update: new architecture (metasploit calls now RPC based), restructured code (no exploit functions at the moment)
0.1.0 First version, nothing special here

## Introduction ##

Botmap is a bot to automate pentests. It is still in a very early stage (ALPHA) and any kind of help is welcome !

This are the basic commands:

    botmap target [target ip]
   This is the command to start botmap. Once started, botmap will launch a complete scan of the target (save it to the db ) and try the available exploits in the metasploit db.

    botmap setup
 This will set up a workspace in the database to which botmap will switch to it everytime you fire it up.

    botmap about
    botmap info
Displays some info about botmap.

    botmap help
    botmap -h
   Displays the help text. (not added yet)

## Installation ##
You need node.js version 0.12 or higher. See the wiki for more information.
Open a console window and type:

    git clone http://github.com/coretool/botmap.git
    cd botmap
    sudo npm install -g
    sudo ln -s /usr/bin/nodejs /usr/bin/node # doesn't matter if it fails

## Note ##
Only use this with permission of the targets owner ! If you don't have his or her permission you will do something illegal ! I am not responsible for what **you**
do with botmap.
