const { ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const bot = require('../../config/bot.json');
const path = require('path');

module.exports = {
    name: 'server-rules',
    description: 'Displays the official server rules with rich formatting and interactive elements.',
    usage: `/server-rules`,
    ownerOnly: 1,
    async execute(interaction) {
        // Create attachment for rules banner
        const attachment = new AttachmentBuilder()
            .setName('ch_rules.png')
            .setDescription('r/CodingHelp Official Rules');

        try {
            // Try to load rules banner image
            const imagePath = path.join(__dirname, '../../assets/ch_rules.png');
            attachment.setFile(imagePath);
        } catch (error) {
            console.log('ch_rules.png not found, sending without banner image');
        }

        // Create the comprehensive rules message using Discohook JSON structure
        const rulesMessage = {
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
                                        url: "attachment://ch_rules.png"
                                    },
                                    description: "r/CodingHelp Official Rules"
                                }
                            ]
                        },
                        {
                            type: 10,
                            content: "Please read these in their entirety as they are the same regardless of where you use Coding Help. You agree to these rules by simply posting anywhere in this server or our subreddit.\n\n-# Last Updated on <t:1761628648:D>"
                        }
                    ]
                },
                {
                    type: 17,
                    accent_color: 1752220,
                    spoiler: false,
                    components: [
                        {
                            type: 10,
                            content: "# Rule 1: No advertising\n\nThis includes but is not limited to: Only posting to share your projects, posting spam outside of # spam and posting NSFW content."
                        },
                        {
                            type: 14
                        },
                        {
                            type: 10,
                            content: "# Rule 2: Don't ping the mods for no reason\n\nUnless you are talking directly with a mod about a coding question, do not ping them. We have a <@575252669443211264> bot you can message to talk to the moderators and report things.\nWe also have a `/report`  command you can use to report things directly to <@455926927371534346>."
                        },
                        {
                            type: 14
                        },
                        {
                            type: 10,
                            content: "# Rule 3: Provide code with ALL QUESTIONS, no exception.\nIf you don't know how to format your code on Discord, you can run the command `/format @yourusernamehere`  to send yourself a DM from <@1017655436704481290> xplaining how to format code on Discord.\n\nYou can also use the options below to paste your code to so that you can link it here.\n\nThis is also tied with: **Do not post screenshots of code**."
                        },
                        {
                            type: 14
                        },
                        {
                            type: 10,
                            content: "# Rule 4: Do not ask personal questions\n\nThese are questions that are not limited to: Age, Gender, Sexual Orientation, Race, etc. This is not a dating server, nor is it a place where those questions matter. They mean nothing when it comes to whether or not someone can code. If someone decides to share anything, they can do so using their own free will. Explicitly asking these questions will get you warned, muted, or banned depending on the circumstances. **NO EXCEPTIONS.**"
                        },
                        {
                            type: 14
                        },
                        {
                            type: 9,
                            components: [
                                {
                                    type: 10,
                                    content: "# Rule 5: No spoon-feeding is done here.\nWe are not going to spoon feed you answers. Meaning we will not tell you exactly how to get from point A to point C without you already knowing how to do points A, B & C. Will can give you some tips on how to get from point A to point C but we will not spoon feed you the answers. Spoon feeding will not help you learn, it will only be harmful to your learning. If you are new to something, please learn the basics before asking for help with something more advanced. If you are not new and we are saying that we are spoon feeding you, then you may need to go back and re-learn the basics."
                                }
                            ],
                            accessory: {
                                type: 2,
                                style: 5,
                                label: "Why don't we spoon feed answers?",
                                emoji: {
                                    name: "🥄"
                                },
                                url: "https://smiletutor.sg/how-spoon-feeding-is-harmful-to-learning/"
                            }
                        },
                        {
                            type: 14
                        },
                        {
                            type: 10,
                            content: "# Rule 6: Do not send mass DMs to users + Do not DM the mods for coding related questions.\n\nIf you are caught DMing a massive number of people (determined by our mods) at a time, you will be permanently banned (perma-banned) from our server. We will not warn you, we will not discuss it. We do not put up with that. Please only DM users that have the DMs open role.\n\nDo not DM the mods for coding related questions. Those can be answered directly in the server."
                        }
                    ]
                }
            ]
        };

        const fetchedChannel = interaction.guild.channels.cache.get(bot.announcementsId);
        
        try {
            // Send the comprehensive rules message
            if (attachment.attachment) {
                await fetchedChannel.send({ ...rulesMessage, files: [attachment] });
            } else {
                await fetchedChannel.send(rulesMessage);
            }

            await interaction.reply({
                content: `✅ **Server Rules Posted!**\n\nI have successfully posted the official server rules to ${fetchedChannel}!\n\nThe rules include all 6 rules with interactive educational content and proper formatting.`,
                flags: 32768
            });

        } catch (error) {
            console.error('Error sending server rules:', error);
            await interaction.reply({
                content: `❌ **Error Occurred**\n\nFailed to send the server rules. Please check my permissions in ${fetchedChannel}.`,
                flags: 32768
            });
        }
    }
};