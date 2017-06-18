## Botmap ##
Botmap is a *pentest* bot.

## Note ##
Only use this with permission of the targets owner ! If you do not have his or her permission you will do something illegal ! I am not responsible for what **you**
do with botmap.

## Todo ##
Currently botmap is under heavy development and far from feature complete. A small
list of current todos is given below:
- Finish version scanners
- Add parser for exploits
- Automate the usage of metasploit exploits
- Add a parser for exploits that are not compatible with metasploit and configure them
- Add parallelism

## Introduction ##
Botmap is a bot to automate pentests. It is still in a very early stage and every
contribution is welcome.

Botmap's functionalities are organized in `modes`. There are currently three modes:
- Fire and Forget (FaF): Launch botmap in fire and forget mode. In this mode, botmap will go through the system and analyze as many devices as possible.

- Scan: In scan mode, botmap will scan the selected target and perform auxiliaries on the targets.

- Vulns: If vulns mode is selected, botmap will test the target for various known vulnerabilities.

When `scan` or `vulns` finishes, a report will be generated in a human readable markdown format as well as in a serialized CSV/JSON/XML format.

## Installation ##

    git clone https://www.github.com/coretool/botmap.git
    cd botmap
    python setup.py

Then reopen your terminal and try it out by running:

    botmap --version

Note that botmap requires `python3`, `pip3` and `metasploit` to work properly.
(Automatic metasploit installation and setup is intended to be implemented in a future version)
