const Discord = require('discord.js');
const bot = require('../../config/bot.json');
const { getServerConfig } = require('../../utils/serverConfig');
const embedConfig = require('../../config/embed.json');

module.exports = {
    name: 'server-rules',
    description: 'Displays an embed with a link to read all of our Code of Conduct.',
    usage: `/server-rules`,
    modOnly: 1,
    execute(interaction) {
        const serverConfig = getServerConfig(interaction.guild.id);
        if (!serverConfig) {
            return interaction.reply({content: 'This command is not configured for this server.', flags: Discord.MessageFlags.Ephemeral});
        }

        const rulesEmbed1 = new Discord.EmbedBuilder()
            .setColor(parseInt(embedConfig.purple_color, 16))
            .setTitle('Our Rules')
            .addFields(
                { name: '1. Civility', value: 'Be civil; treat others how you would like to be treated.' },
                { name: '2. Advertising', value: 'This isn\'t place for advertisements.' },
                { name: '3. No Adult Content', value: 'This discord does not allow the posting of any adult material. This applies to all posts and comments. This is a zero tolerance rule; you will be banned on your first offence, don\'t do it.' },
                { name: '4. Mod Contact', value: `Do not message the mods directly for any reason. If you are wanting to message the mods, please message <@575252669443211264> to contact the mods. If you are messaging the mods directly, your messages will be ignored. If you are continually messaging the mods, you will be warned or banned.` },
            );

            const fetchedChannel = interaction.guild.channels.cache.get(serverConfig.rulesChannelID);
            fetchedChannel.send({ embeds: [rulesEmbed1], components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 5,
                            label: 'Invite your friends!',
                            url: bot.inviteLink
                        }, 
                    ]
                }
            ] });

        interaction.reply({content: `I have done it, please check ${fetchedChannel}!`, flags: Discord.MessageFlags.Ephemeral});

    },

};