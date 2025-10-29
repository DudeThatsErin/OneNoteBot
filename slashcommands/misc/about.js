const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn about the r/CodingHelp bot'),
    
    async execute(interaction) {
        const aboutEmbed = new EmbedBuilder()
            .setColor(0x1ABA7C)
            .setTitle('About r/CodingHelp Bot')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setDescription('I am the official bot of the r/CodingHelp Discord server and subreddit community!')
            .addFields(
                {
                    name: '🎯 Purpose',
                    value: 'Help developers learn, grow, and connect with the coding community',
                    inline: false
                },
                {
                    name: '🌟 Features',
                    value: '• Welcome new members\n• Provide coding resources\n• Share server rules\n• Community management tools',
                    inline: false
                },
                {
                    name: '📊 Stats',
                    value: `• Servers: ${interaction.client.guilds.cache.size}\n• Users: ${interaction.client.users.cache.size}\n• Uptime: ${Math.floor(interaction.client.uptime / 86400000)}d ${Math.floor(interaction.client.uptime / 3600000) % 24}h`,
                    inline: true
                },
                {
                    name: '🔗 Links',
                    value: '[Subreddit](https://reddit.com/r/CodingHelp)\n[Wiki](https://coding-help.vercel.app/)\n[Invite Friends](https://discord.gg/geQEUBm)',
                    inline: true
                }
            )
            .setFooter({ 
                text: 'Created by the r/CodingHelp team', 
                iconURL: interaction.guild?.iconURL() 
            })
            .setTimestamp();

        await interaction.reply({ embeds: [aboutEmbed], flags: 32768 });
    }
};
