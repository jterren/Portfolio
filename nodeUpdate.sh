export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install node
npm install -g npm@latest
npm update #Updates should handle audit fix as well,
npm audit fix #but just in case there are remaining fixes apply them and report audit results for manual fixes