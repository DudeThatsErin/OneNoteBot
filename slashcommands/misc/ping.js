const config = require('../../config/config.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'ping',
    description: 'Makes sure the bot can hear commands.',
    usage: `/ping `,
    cooldown: 5,
    async execute(interaction, client) {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        // Create the uptime string
        const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Create attachment for the ping image (you'll need to add this image file)
        const attachment = new AttachmentBuilder()
            .setDescription('CodingHelp Bot Ping Image');

        try {
            // Try to create attachment from file if it exists
            const imagePath = path.join(__dirname, '../../assets/ch_ping.png');
            attachment.setFile(imagePath);
        } catch (error) {
            // If image doesn't exist, we'll send without attachment
            console.log('ch_ping.png not found, sending without image');
        }

        // Create ping message using Discohook JSON structure
        const pingMessage = {
            components: [
                {
                    type: 17,
                    accent_color: 1752220,
                    components: [
                        {
                            type: 12,
                            items: [
                                {
                                    media: {
                                        url: "attachment://ch_ping.png"
                                    }
                                }
                            ]
                        },
                        {
                            type: 14,
                            divider: true,
                            spacing: 2
                        },
                        {
                            type: 10,
                            content: `Thanks for checking if r/CodingHelp was online. r/CodingHelp has been awake for **${uptimeString}**!\n\nMy command prefix is \`${config.prefix}\` .\n\nI am the official bot of the [CodingHelp](https://reddit.com/r/CodingHelp) discord server! If you want to see all of my commands run \`/help\` .`
                        },
                        {
                            type: 10,
                            content: "# Useful Links"
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 5,
                            label: "Uptime",
                            url: "https://stats.uptimerobot.com/0pj23Sk01K"
                        },
                        {
                            type: 2,
                            style: 5,
                            label: "GitHub Repo",
                            url: "https://github.com/dudethatserin/codinghelp-bot/"
                        },
                        {
                            type: 2,
                            style: 5,
                            label: "Subreddit",
                            url: "https://reddit.com/r/CodingHelp"
                        },
                        {
                            type: 2,
                            style: 5,
                            label: "Wiki",
                            url: "https://coding-help.vercel.app/"
                        },
                        {
                            type: 2,
                            style: 5,
                            label: "Invite your friends!",
                            url: "https://discord.gg/geQEUBm"
                        }
                    ]
                }
            ]
        };

        // Send the response
        if (attachment.attachment) {
            await interaction.reply({ 
                ...pingMessage, 
                files: [attachment],
                flags: 32768
            });
        } else {
            await interaction.reply({
                ...pingMessage,
                flags: 32768
            });
        }
};