class Database(object):

    def __init__(self, terminal):
        self.terminal = terminal

    def setup(self):
        self.terminal.execute('db_status')
        res = self.terminal.expect('connected')
        self.terminal.execute('workspace -a botmap')
        res = self.terminal.expect('added')
        self.terminal.execute('workspace botmap')

    def remove(self):
        self.terminal.execute('workspace -d botmap')
        res = self.terminal.expect('Deleted')

    def switch(self, ws):
        self.terminal.execute('workspace ' + ws)

    def hosts(self):
        self.terminal.execute('hosts -c address,arch,info,mac,os_flavor,os_name')
        hosts = self.terminal.expect('>')
        return hosts

    def services(self, ip):
        self.terminal.execute('services -c name,info,port {0}'.format(ip))
        services = self.terminal.expect('>')
        return services
