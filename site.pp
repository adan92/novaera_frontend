node default {

  class { 'nodejs':
    version => 'stable',
  }

  package { 'git':
    ensure => 'installed',
  }

  package { 'bower':
    provider => npm,
    require  => Class['nodejs'],
  }
  
  package { 'grunt-cli':
    provider => npm,
    require  => Class['nodejs'],
  }
  
  package { 'gulp':
    provider => npm,
    require  => Class['nodejs'],
  }

  package { 'compass':
    ensure   => 'installed',
    provider => 'gem',
  }

  file { "/etc/profile.d/node_path.sh":
    content => "PATH=\$PATH:/usr/local/node/node-default/bin\n",
  }
}