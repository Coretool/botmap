## Botmap##
Botmap is a *nmap* and *metasploit* bot.

## Introduction##

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

##Installation##
Use this to install Botmap:

    cd botmap
    chmod +x install.sh
    sudo ./install.sh

## Note ##
Only use this with permission of the targets owner ! If you don't have his or her permission you will do something illegal ! I am not responsible for what **you**
do with botmap.
