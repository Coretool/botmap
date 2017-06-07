import os
import pty
import select

class Terminal(object):

    def __init__(self, fd):
        self.fd = fd

    def expect(self, s):
        poll = select.poll()
        poll.register(self.fd, select.POLLIN)
        while True:
            evt = poll.poll()
            output = os.read(self.fd, 1024)
            if bytes(s, 'utf-8') in output:
                return output

    def execute(self, s):
        byte_str = bytes(s + '\n', 'utf-8')
        os.write(self.fd, byte_str)
        return

    def quit(self):
        os.close(self.fd)


def fork():
    return pty.fork()

def run(prog):
        os.execvp(prog, ['pi'])
