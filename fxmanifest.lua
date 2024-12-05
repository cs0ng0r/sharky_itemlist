fx_version 'cerulean'
game 'gta5'

author 'YourName'
description 'Item Display with NUI'
version '1.0.0'

-- Server Scripts
server_scripts {
    'server.lua'
}

-- Client Scripts
client_scripts {
    'client.lua'
}

-- NUI Files
ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/script.js'
}

dependencies {
    'ox_inventory'
}
