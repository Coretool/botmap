class auxiliary(object):

    def __init__(self, terminal, name, host):
        self.name = name
        self.terminal = terminal
        self.options = []
        self.host = host

    def select(self):
        self.terminal.execute('use ' + self.name)
        self.terminal.expect('>')

    def setup(self):
        for option in self.options:
            if config[option]:
                self.terminal.execute('hosts -R {0}'.format(self.host))

    def run(self):
        self.terminal.execute('run')
        output = self.terminal.expect('>') # wait for auxiliary to finish
        return ouput

    def exit(self):
        self.terminal.execute('back')
        self.termina.expect('>')
