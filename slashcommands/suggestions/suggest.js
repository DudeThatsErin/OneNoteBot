const Discord = require('discord.js');
const connection = require('../../database.js');
const bot = require('../../config/bot.json');
const { getServerConfig } = require('../../utils/serverConfig');
const embedConfig = require('../../config/embed.json');

module.exports = {
    name: 'suggestions',
    description: 'Creates a suggestion!',
    usage: `/suggestions [suggestion here]`,
    example: `/suggestions I want pudding!`,
    options: [
        {
            name: 'message',
            description: 'What is the suggestion?',
            type: 3,
            required: true
        }
    ],
    botSpamOnly: 1,
    async execute(interaction){
        const serverConfig = getServerConfig(interaction.guild.id);
        if (!serverConfig) {
            return interaction.reply({ content: 'This command is not available in this server.', flags: Discord.MessageFlags.Ephemeral });
        }
        
        const channel = interaction.guild.channels.cache.get(serverConfig.suggestionsChannelId);
        let messageArgs = interaction.options.getString('message');
        let newStatus = 'New Suggestion';
        let author = interaction.user.id || 'default value';
        let name = interaction.user.tag;
        let avatar = interaction.user.displayAvatarURL();

        const initial = new Discord.EmbedBuilder()
        .setColor(parseInt(embedConfig.teal_color, 16))
        .setAuthor({name: name, icon_url: avatar})
        .setDescription(messageArgs)
        .setFooter({text: embedConfig.footertext, iconURL: embedConfig.footericon});

        interaction.client.users.cache.get(author).send({content: `Hey, ${interaction.user.username}! Thanks for submitting a suggestion! Our server needs to have time to vote on this. Once some time has passed, you can check the suggestion channel to check the updated status of your suggestion! We appreciate your feedback! Happy chatting!`});

        await channel.send({embeds: [initial]}).then(async (message) => {
            message.react('👍');
            message.react('👎');
            message.startThread({
                name: `${name} made a suggestion`,
                autoArchiveDuration: 60,
                type: 'GUILD_PUBLIC_THREAD'
            });
            try {
                await connection.query(
                    `INSERT INTO Suggs (noSugg, Author, Message, Avatar, stat) VALUES(?, ?, ?, ?, ?)`,
                    [message.id, author, messageArgs, avatar, newStatus]
                );

            } catch(err) {
                console.log(err);
            }
        });

        interaction.reply({content: `I have sent your suggestion! Please check ${channel} to see it and interact in the thread that was created!`, flags: Discord.MessageFlags.Ephemeral})




    }
}