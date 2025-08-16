// at the top of your file
const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'access',
    description: 'Displays an embed telling people how to get access to our server.',
    usage: `/access`,
    ownerOnly: 1,
    async execute(interaction) {

        const accessEmbed = new Discord.EmbedBuilder()
            .setColor(0xFFA500)
            .setTitle('Get Access to Our Server!')
            .setDescription('Please check <#1406089587553468436> and react to the correct message to get access to our server!');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089587553468436'); 
        
        try {
            await fetchedChannel.send({ embeds: [accessEmbed] });
            interaction.reply({content: `I have done it, please check!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089587553468436>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    },

};