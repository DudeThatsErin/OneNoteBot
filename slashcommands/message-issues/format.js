const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'format',
  description: 'Asks people to format their code with backticks or by sharing their code on places like pastebin.com',
  usage: `/format @username or user ID`,
  example: `/format @DudeThatsErin`,
  options: [
    {
      name: 'user',
      description: 'Who needs to format their code?',
      required: true,
      type: 6
    }
  ],
  async execute(interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Our Website')
          .setStyle(ButtonStyle.Link)
          .setURL('https://codinghelp.site'),
        new ButtonBuilder()
          .setLabel('Our Subreddit')
          .setStyle(ButtonStyle.Link)
          .setURL('https://reddit.com/r/CodingHelp'),
        new ButtonBuilder()
          .setLabel('Need more help learning to format your code?')
          .setStyle(ButtonStyle.Link)
          .setURL('https://www.writebots.com/discord-text-formatting/')
      );

      const user = interaction.options.getUser('user');

        const formatContent = `# Did you format your code? 💻

Please format your code using backticks. If you don't understand, we have an example below. Future code you share will be deleted until you format it.

## How do I format my code?

Great question! You will want to use the backtick key on your keyboard. It looks like this \\\`. It is next to your number 1 key on your keyboard.

**Single line of code:** Use a single backtick around your code like so:
\\\`<img src="image source here" alt="alt text here" />\\\`

**Multiple lines of code:** Use 3 backticks around your code like so:
\\\`\\\`\\\`
<html>
extra code here...
another line here...
</html>
\\\`\\\`\\\`

This outputs this:
\`\`\`html
<html>
<head>
</head>
<body>
</body>
</html>
\`\`\`

**Syntax highlighting:** After the first 3 backticks, write the type of code it is (HTML, JavaScript, Java, etc.)

## Why do I have to format my code?

You need to format it because it is easy to read regardless of what device you are using to view Discord. So, to make it easier for all our members to be able to help you, we ask that you format your code as shown above.

## Useful Links`;

      try {
        await user.send({ content: formatContent, components: [row] });
        await interaction.reply({ content: `📨 Hey, ${user} I just sent you a DM about formatting your code! Please check it!` });
      } catch (error) {
        await interaction.reply({ content: `❌ I couldn't send a DM to ${user}. They may have DMs disabled. Here's the formatting guide:\n\n${formatContent}`, components: [row], ephemeral: true });
      }
    
  },

};