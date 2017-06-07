"""
Botmap is a metasploit bot capable of autonomously performing most of the common metasploit tasks.
For more information visit https://www.github.com/coretool/botmap.

Usage:
    botmap MODE TARGET [--verbose | --quiet | --opts=<opts> | --output=<file>]
    botmap -h | --help
    botmap -v | --version


Arguments:
    MODE                Mode to set botmap to. Can be one of the following:
                        faf, fire and forget mode; Botmap will attempt to somehow find a way into the system.
                        scan, scan mode; Botmap will by default perform all possible scans. Set opts to change this behaivor.
                        vulns, vulns mode; Botmap will try to find all known vulnerabilities on the target.

    TARGET              Can be an IP, a range of IPs, 'network' (to target all devices in the network) or router (to target the router only)


Options:
    -h, --help          Display this help message
    --opts=<opts>       Advanced options that can be passed to certain actions. See project wiki for more information.
    --output=<file>     Write output to <file>
    -v, --version       Print out the version string of the installed program

Please note that I am not responsible for what you do with botmap.
"""

from docopt import docopt

import botmap.terminal as terminal

if __name__ == '__main__':

    VERSION = 'Botmap version 0.3 by Coretool'

    arguments = docopt(__doc__, version='Botmap 0.3')

    if arguments['MODE'] == 'faf':
        pass
        """
        pid, fd = terminal.fork()

        if pid == 0:
            terminal.run('')

        elif pid > 0:
            t = terminal.Terminal(fd)
        """
    elif arguments['MODE'] == 'scan':
        pass

    elif arguments['MODE'] == 'vulns':
        pass

    elif arguments['--version'] == True:
        print(VERSION)

    else:
        print('MODE ' + arguments['MODE'] + ' does not exist')
