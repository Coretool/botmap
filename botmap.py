"""
Botmap is a metasploit bot capable of autonomously performing most of the common metasploit tasks.
For more information visit https://www.github.com/coretool/botmap.

Usage:
    botmap TARGET [--verbose | --quiet | --opts=<opts> | --output=<file>]
    botmap -h | --help
    botmap -v | --version


Arguments:
    TARGET              Can be an IP, a range of IPs (e.g. 192.168.1.1-42), 'network' (to target all devices in the network) or 'router' (to target the router only)


Options:
    -h, --help          Display this help message
    --opts=<opts>       Advanced options that can be passed to certain actions. See project wiki for more information.
    --output=<file>     Write output to <file> The format can be JSON, XML or TOML
    --quite             Set log level to quiet; Botmap will not log anything
    --verbose           Set log level to verbose; Botmap will log every action taken.
    -v, --version       Print out the version string of the installed program

Please note that I am not responsible for what you do with botmap.
"""

from docopt import docopt
from grab import Grab
import json
import os

import botmap.db as DB
import botmap.scanners as scanners
import botmap.terminal as terminal

if __name__ == '__main__':
    VERSION = 'Botmap version 0.3 by Coretool'

    arguments = docopt(__doc__, version=VERSION)

    if arguments['TARGET'] is not None:
        pid, fd = terminal.fork()

        if pid == 0:
            terminal.run('msfconsole')  # start a msf shell

        elif pid > 0:
            t = terminal.Terminal(fd)
            db = DB.Database(t)  # create a new db handler
            db.setup()  # initialize a new workspace
            targets = arguments['TARGET']
            hosts = []
            if targets == 'network':
                hosts = scanners.arp_sweep()  # scan the network
                for host in scanners.ipv6_neighbor():  # check if we missed anybody
                    if host not in hosts:
                        hosts.append(host)

            elif targets == 'router':
                hosts.append(scanners.find_router())

            else:  # an ip (range) has been submitted, we can proceed
                if '-' in targets:
                    targets = targets.split('.')
                    low = targets[3].split('-')[0]
                    high = targets[3].split('-')[1]
                    for n in range(low, high):
                        hosts.append('{0}.{1}.{2}.{3}'.format(targets[0], targets[1], targets[2], n))

                elif '/' in targets:
                    targets = targets.split('.')
                    high = targets[3].split('/')[1]
                    for n in range(low, high):
                        hosts.append('{0}.{1}.{2}.{3}'.format(targets[0], targets[1], targets[2], n))
                        low = targets[3].split('/')[0]

        # begin with a nmap scan
        for host in hosts:
            scanners.db_nmap(host)

        # go through all hosts and their services
        exploits = []
        for host in hosts:
            services = db.services(host)
            services = services.split('\n')
            for service in services:
                service = service.split(' ')[1]  # service type is at pos 2 in the output
                if service == 'ftp':
                    service_version = scanners.ftp_version(t, host)
                elif service == 'http':
                    service_version = scanners.http_version(t, host)
                elif service == 'imap':
                    service_version = scanners.imap_version(t, host)
                elif service == 'mssql'
                    service_version == scanners.mssql_version(t, host)
                elif service == 'mysql':
                    service_version = scanners.mysql_version(t, host)
                elif service == 'pop':
                    service_version = scanners.pop_version(t, host)
                else:
                    pass
                # TODO: Find a way of finding a matching auxiliary
                ver = service_version.split('/')
                res = os.popen('searchsploit --json {0} {1}'.format(ver[0], ver[1]))  # receive exploit db results
                res = json.loads(res)
                for r in res['RESULTS']:
                    if ver[0] in r['Exploit'] and ver[1] in r['Exploit']:
                        exploits.append([host, r['Path']])
        urls = []
        for exploit in exploits:
            path = exploit[1].split('/')
            urls.append([exploit[0], exploit[1],'http://www.exploitdb.com/exploits/' + path[len(path) - 1]])  # build the exploit's url

        # go through the exploits
        g = Grab()
        for url in urls:
            pass


    elif arguments['--version'] == True:
        print(VERSION)

    else:
        print('Command ' + arguments['MODE'] + ' does not exist')
