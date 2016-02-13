#! /bin/bash
if [ ! -f /home/vagrant/novaera_frontend ]
then
  echo "ADD EXTRA ALIAS VIA .bashrc"
  cat /vagrant/bashrc.append.txt >> /home/vagrant/.bashrc
  echo "GENERAL APT-GET UPDATE"
  sudo apt-get autoclean
  sudo apt-get update
  sudo apt-get dist-upgrade
  echo "INSTALL NODEJS"
   sudo apt-get -y  install nodejs
   sudo apt-get install nodejs-legacy

  echo "INSTALL NPM"
   sudo apt-get -y  install npm
  echo "INSTALL GIT"
   sudo apt-get -y  install git
  echo "INSTALL VIM"
   sudo apt-get -y  install vim
  echo "INSTALL TREE"
   sudo apt-get -y  install tree
  echo "INSTALL UNZIP"
   sudo apt-get -y  install unzip

  sudo npm install -g bower
  sudo npm install -g gulp
  sudo npm install gulp --save-dev
  cd novaera_frontend
  npm cache clean
  npm install --no-bin-links
  bower install
  echo "Done!"
else
  echo "already installed flag set : /home/vagrant/novaera_frontend"
fi

