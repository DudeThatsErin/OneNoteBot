// at the top of your file
const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'access-two',
    description: 'Displays an embed telling people how to get access to our server.',
    usage: `/access-two`,
    ownerOnly: 1,
    data: {
        name: 'access-two',
        description: 'Displays an embed telling people how to get access to our server.'
    },
    async execute(interaction) {

        // TODO UPDATE
        const accessEmbed = new Discord.EmbedBuilder()
            .setColor(0xFFA500)
            .setTitle('Access to our server!')
            .setDescription('React with :blue_heart: to get access to our server!');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089587553468436'); // announcements channel
        
        if (!fetchedChannel) {
            // Debug: Show available channels
            const availableChannels = interaction.guild.channels.cache.map(ch => `${ch.name} (${ch.id})`).join('\n');
            console.log('Available channels:', availableChannels);
            return interaction.reply({content: `Error: Could not find the channel (ID: <#1406089587553468436>). Check console for available channels.`, flags: Discord.MessageFlags.Ephemeral});
        }
        
        try {
            await fetchedChannel.send({ embeds: [accessEmbed] });
            interaction.reply({content: `I have done it, please check!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089587553468436>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    },

};