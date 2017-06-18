import os
import re

from prototypes import auxiliary
# TODO: add more auxiliaries

# nmap
def db_nmap(terminal, target):
        terminal.execute('db_nmap -A {!s}'.format(target))
        terminal.expect('>')  # wait for the scan to finish

# router
def find_router():
    ip_route = os.popen('ip route').read()
    ip_route = ip_route.split('\n')
    for route in ip_route:
        if 'default via' in route:
            route = route.split(' ')
            return route[2]

# discovery
def arp_sweep(terminal, host):
    module = auxiliary.auxiliary(terminal, 'auxiliary/scanner/discovery/arp_sweep', host)
    module.select()
    module.setup()
    rows = module.run()
    module.exit()
    hosts = []
    for row in rows:
        row = str(row)
        if 'to be up' in row:
            row = row.split(' ')
            hosts.append(row[1])
    return hosts

def ipv6_neighbor(terminal, host):
    module = auxiliary.auxiliary(terminal, 'auxiliary/scanner/discovery/ipv6_neighbor', host)
    module.select()
    module.setup()
    rows = module.run()
    module.exit()
    hosts = []
    for row in rows:
        row = str(row)
        if 'is alive' in row:
            row = row.split(' ')
            hosts.append(row[1])

# versions
def http_version(terminal, host):
    module = auxiliary.auxiliary(terminal, 'auxiliary/scanner/http/http_version', host)
    module.select()
    module.setup()
    rows = module.run()
    module.exit()
    ver = re.compile(r'[A-Za-z]+\/[1-9].{4}')
    results = []
    for row in rows():
        results.append(ver.match(row).group())
    return results
