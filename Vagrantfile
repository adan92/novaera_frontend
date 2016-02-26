# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64"
  #config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/trusty-server-cloudimg-amd64-juju-vagrant-disk1.box"
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 1
  end
  config.vm.hostname = "nodejs"
  config.vm.network "private_network", ip: "11.12.13.14"
  #config.vm.network :forwarded_port, guest: 9001, host: 9001
  #config.vm.network :forwarded_port, guest: 35730, host: 35730

  # config.ssh.private_key_path = "~/.ssh/id_rsa"
  # config.ssh.forward_agent = true
  # config.ssh.forward_agent = true

  config.vm.provision :shell, :path => "provision.sh"




  config.vm.synced_folder "C:/Users/Christian/Documents/frontend", "/home/vagrant/novaera_frontend" , mount_options: ['dmode=755', 'fmode=774']

end