const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, AttachmentBuilder } = require('discord.js');
const bot = require('../../config/bot.json');
const path = require('path');

module.exports = {
    name: 'welcome',
    description: 'Displays information about our server.',
    usage: `/welcome`,
    modOnly: 1,
    async execute(interaction) {
        // Create attachment for banner image
        const attachment = new AttachmentBuilder()
            .setName('chbanner.png')
            .setDescription('CodingHelp Server Banner');

        try {
            // Try to load banner image
            const imagePath = path.join(__dirname, '../../assets/chbanner.png');
            attachment.setFile(imagePath);
        } catch (error) {
        }

        // Get current timestamp for "Last Updated"
        const lastUpdated = Math.floor(Date.now() / 1000);

        // Create the main welcome message using standard Discord.js embeds
        const welcomeEmbed = new EmbedBuilder()
            .setColor(0x1ABA7C)
            .setImage(imagePath)
            .setDescription(`We are a Discord Server dedicated to helping people learn how to code. We have over **4.2k** members and can't wait to welcome more! Come join the community of people that are looking to share their knowledge with new programmers!\n\nLast Updated: <t:${lastUpdated}:R>`);

        const welcomeButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Subreddit')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://reddit.com/r/CodingHelp')
                    .setEmoji('🤖'),
                new ButtonBuilder()
                    .setLabel('Wiki')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://coding-help.vercel.app/')
                    .setEmoji('📖'),
                new ButtonBuilder()
                    .setLabel('Invite your friends!')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.gg/geQEUBm')
                    .setEmoji('🔗')
            );

        const welcomeMessage = {
            embeds: [welcomeEmbed],
            components: [welcomeButtons]
        };

        // Staff information message using standard Discord.js embeds
        const staffEmbed = new EmbedBuilder()
            .setColor(0x1ABA7C)
            .setTitle('Staff Team')
            .setDescription('**Owner**: <@455926927371534346>\n<@&703347886045266061>: <@732667572448657539> & <@329677263010529280>\n<@&706528088690917538>: <@320861867062853632> & <@435104781527416838>')
            .addFields({
                name: 'How can I become part of the staff team?',
                value: 'You can apply by using <@575252669443211264>. Send the <@575252669443211264> bot a DM and we will respond. We accept applications all year long though becoming a mod happens randomly.\n\n-# Staff Applications are currently **open** as of <t:1757816220:R>!'
            });

        const staffMessage = {
            embeds: [staffEmbed]
        };

        // Channels information message using standard Discord.js embeds
        const channelsEmbed = new EmbedBuilder()
            .setColor(0x1ABA7C)
            .setTitle('Channels')
            .setDescription('The **r/CodingHelp** Discord Server has many different channels to help keep conversations split up and on topic so that things are easy to search for and more engaging.\n\nWe have 4 different categories things are split into which are **Updates**, **Coding Help**, **Discussions**, and **Server Boosters**.\n\nIf you click **Channels & Roles** in the top sidebar you can enable/disable channels and see what channels we have available!')
            .addFields(
                {
                    name: '📣 │Updates',
                    value: '- <#359760352470368281> -- Where important information is shared with the community.\n- <#1432545665069613248> -- Where we share posts made by our community from Reddit with over **21k** members.\n- <#1009156807027081350> -- All news articles from popular software engineering tools are posted here. If you would like to suggest one use the `suggestions` command!'
                },
                {
                    name: '💻│Coding Help',
                    value: '- <#1042810437177188463> -- All of our rules for the server.\n- <#383032186317832202> -- All of the information you need to know for the server.\n- <#679190375000178689> -- Introduce yourself to the rest of the server.\n- <#433877613128450061> -- Use the `suggestions` command to suggest something for our Server, Subreddit, or Wiki. We regularly go through these and decide on them and you can vote on suggestions here.\n- <#1432533154186395801> -- All popular messages with 3 :star:\'s or more are added here.'
                },
                {
                    name: '🔥 │ Server Boosters',
                    value: 'These are all exclusive channels for our server boosters. Boost the server to get access!\nServer boosters also get priority assistance in any of the discussion channels as well!\n\n- <#990736737657561138> -- General chatter\n- <#844185945498451968> -- General Life Advice or SWE Advice or anything else!'
                },
                {
                    name: '💬│Discussions',
                    value: '- <#359760149683896322> -- off topic chatter that is not related to coding!\n- <#844185635874930750> -- Spam memes, gifs, or messages, whatever, doesn\'t matter. This is a free for all channel. Pings are **not allowed** unless part of a conversation.\n- <#433962402292432896> -- use any and all of our bot commands here!\n- <#1432529672012435607> -- General coding chatter. As something is talked about a lot, we move it to its own channel.'
                }
            );

        const channelsMessage = {
            embeds: [channelsEmbed]
        };

        // More information message using standard Discord.js embeds
        const moreInfoEmbed = new EmbedBuilder()
            .setColor(0x1ABA7C)
            .setTitle('More Information')
            .addFields(
                {
                    name: 'Suggestions',
                    value: 'To submit a suggestion use the `/suggestions` command. It will post a message in the <#433877613128450061> channel automatically and you can then vote on it.'
                },
                {
                    name: 'Notifications',
                    value: 'Choose what type of notifications you would like to receive!'
                },
                {
                    name: 'Let us know if your DMs are open',
                    value: 'If they are closed, we will make sure no one DMs you.'
                },
                {
                    name: 'Language Role Selection',
                    value: 'Select which programming languages you are proficient in. We use these to ping people who know the language(s).'
                }
            );

        // Role selection dropdowns (keeping the complex Discohook structure for now)
        const notificationRoles = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('notification_roles')
                    .setPlaceholder('Select notification preferences')
                    .setMinValues(0)
                    .setMaxValues(4)
                    .addOptions([
                        {
                            label: 'Announcements',
                            value: '772153399336632330',
                            description: 'Get notified about server announcements'
                        },
                        {
                            label: 'Events',
                            value: '772153457111990282',
                            description: 'Get notified about server events'
                        },
                        {
                            label: 'Updates',
                            value: '780111997861363742',
                            description: 'Get notified about bot/server updates'
                        },
                        {
                            label: 'News',
                            value: '772154227459883019',
                            description: 'Get notified about coding news'
                        }
                    ])
            );

        const dmPreferences = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('dm_preferences')
                    .setPlaceholder('Select DM preferences')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'DMs Open',
                            value: '772156735351816224',
                            description: 'Allow members to DM you'
                        },
                        {
                            label: 'DMs Closed',
                            value: '772156742045138964',
                            description: 'Do not allow members to DM you'
                        }
                    ])
            );

        const programmingLanguages = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('programming_languages')
                    .setPlaceholder('Select programming languages')
                    .setMinValues(0)
                    .setMaxValues(10)
                    .addOptions([
                        { label: 'JavaScript', value: '703988951949639740' },
                        { label: 'TypeScript', value: '805101110989422592' },
                        { label: 'Python', value: '703988831212404837' },
                        { label: 'Java', value: '703988645920637009' },
                        { label: 'C#', value: '780083341591314463' },
                        { label: 'C++', value: '703988615348355103' },
                        { label: 'PHP', value: '703988696491360346' },
                        { label: 'Ruby', value: '703988736479723601' },
                        { label: 'Go', value: '703988769220722768' },
                        { label: 'Rust', value: '703988590631321672' }
                    ])
            );

        const moreInfoMessage = {
            embeds: [moreInfoEmbed],
            components: [notificationRoles, dmPreferences, programmingLanguages]
        };

        const fetchedChannel = interaction.guild.channels.cache.get(bot.announcementsId);
        
        try {
            // Send all the messages in sequence
            if (attachment.attachment) {
                await fetchedChannel.send({ ...welcomeMessage, files: [attachment] });
            } else {
                await fetchedChannel.send(welcomeMessage);
            }
            
            await fetchedChannel.send(staffMessage);
            await fetchedChannel.send(channelsMessage);
            await fetchedChannel.send(moreInfoMessage);

            await interaction.reply({
                content: `✅ **Welcome Message Posted!**\n\nI have successfully posted the complete welcome message to ${fetchedChannel}!\n\nThe message includes:\n• Server introduction with banner\n• Staff team information\n• Channel descriptions\n• Role selection menus`,
                flags: 32768
            });

        } catch (error) {
            console.error('Error sending welcome message:', error);
            await interaction.reply({
                content: `❌ **Error Occurred**\n\nFailed to send the welcome message. Please check my permissions in ${fetchedChannel}.`,
                flags: 32768
            });
        }
    }
};