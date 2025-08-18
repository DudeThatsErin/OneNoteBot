const Discord = require('discord.js');

module.exports = {
    name: 'syncthingsync',
    description: 'Information about SyncthingSync - Obsidian Plugin for Syncthing integration',
    usage: '/syncthingsync',
    data: {
        name: 'syncthingsync',
        description: 'Information about SyncthingSync - Obsidian Plugin for Syncthing integration'
    },
    execute(interaction) {
        const syncthingSyncEmbed = new Discord.EmbedBuilder()
            .setColor(0x973131)
            .setTitle('What is SyncthingSync?')
            .setDescription('SyncthingSync is an open-source (desktop only) Obsidian Plugin that enables the ability to sync with syncthing directly inside Obsidian so you don\'t need to run syncthing separately. You can visit the [SyncthingSync GitHub](https://github.com/DudeThatsErin/SyncthingSync) to learn more.');

        interaction.reply({ embeds: [syncthingSyncEmbed] });
    }
};
