const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'server-rules',
    description: 'Displays an embed with a link to read all of our Code of Conduct.',
    usage: `/server-rules`,
    ownerOnly: 1,
    
    data: {
        name: 'server-rules',
        description: 'Displays an embed with a link to read all of our Code of Conduct.'
    },
    execute(interaction) {
        const rulesEmbed1 = new Discord.EmbedBuilder()
            .setColor(0x3EBC38)
            .setTitle('Our Rules')
            .addFields(
                { name: 'Rule 1', value: `No spam, advertising or NSFW content. Be nice. Use common sense.\n\nIf you are found to post spam or advertise, you will be warned or banned.` },
                { name: 'Rule 2', value: `Don\’t ask if you can ask a question, just ask it! If someone knows the answer, they\’ll do their best to help.` },
                { name: 'Rule 3', value: `Do not message the mods directly for any reason. If you are wanting to message the mods, please message <@575252669443211264> to contact the mods. If you are messaging the mods directly, your messages will be ignored. If you are continually messaging the mods, you will be warned or banned.` },
                { name: 'Rule 4', value: 'Do not ask our members personal questions like gender, age, sexual preference, etc. This is not a dating server, nor is it a place where those questions matter. They mean nothing when it comes to whether or not someone can code. If someone decides to share anything, they can do so using their own free will. Explicitly asking these questions will get you warned, muted, or banned depending on the circumstances. **NO EXCEPTIONS.**' },
                { name: 'Rule 5', value: 'Do not send mass DMs to users. If you are caught DMing a massive number of people (determined by our mods) at a time, you will be permanently banned (perma-banned) from our server. We will not warn you, we will not discuss it. We do not put up with that. Please only DM users that have the **DMs Open** role.' },
            );

            const fetchedChannel = interaction.guild.channels.cache.get('1406089587553468436');
            fetchedChannel.send({ embeds: [rulesEmbed1] });

        interaction.reply({content: `I have done it, please check ${fetchedChannel}!`, flags: Discord.MessageFlags.Ephemeral});

    },

};