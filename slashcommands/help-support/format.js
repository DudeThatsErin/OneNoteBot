const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config/embed.json');

module.exports = {
    name: 'format',
    description: 'Asks people to format their code with backticks or by sharing their code on places like pastebin.com',
    usage: `/format [user]`,
    options: [
        {
            name: 'user',
            description: 'Who needs to format their code?',
            required: false,
            type: 6
        }
    ],
    execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Discord Server')
                    .setStyle(5)
                    .setURL('https://discord.gg/zgkMsNcBPT'),
                new ButtonBuilder()
                    .setLabel('Need more help learning to format your code?')
                    .setStyle(5)
                    .setURL('https://www.writebots.com/discord-text-formatting/')
            );

        const user = interaction.options.getUser('user') || interaction.user;

        const formatEmbed = new EmbedBuilder()
            .setColor(parseInt(config.teal_color, 16))
            .setTitle('Did you format your code?')
            .setDescription(`Please format your code using backticks. If you don't understand, we have an example below. Future code you share will be deleted until you format it.`)
            .addFields(
                {
                    name: 'How do I format my code?',
                    value: 'Great question! You will want to use the backtick key next to your keyboard. It looks like this `. It is next to your number 1 key on your keyboard.\n\nIf you have a single line of code, you will want to use a single backtick around your code like so: `<img src="image source here" alt="alt text here" />`\n\nIf you have multiple lines of code (2 or more) you will want to use 3 backticks around your code like so:\n\\`\\`\\`\n<html>\nextra code here...\nanother line here...\n</html>\n\\`\\`\\`\n\nAlso, highlight the syntax, after the first 3 backticks you will write the type of code it is, like HTML, JavaScript, Java, etc.'
                },
                {
                    name: 'Why do I have to format my code?',
                    value: 'You need to format it because it is easy to read regardless of what device you are using to view Discord. So, to make it easier for all our members to be able to help you, we ask that you format your code as shown above.'
                }
            );

        try {
            user.send({ content: `Hey, ${user}!`, embeds: [formatEmbed], components: [row] });
            interaction.reply({ content: `📨 Hey, ${user} I just sent you a DM about formatting your code! Please check it!`, flags: 64 });
        } catch (error) {
            interaction.reply({ embeds: [formatEmbed], components: [row], flags: 64 });
        }
    }
};
