const Discord = require('discord.js');
const o = require('../config/owner.json');
const bot = require('../config/bot.json');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isMessageComponent()) return;

        const command = client.slashCommands.get(interaction.commandName) || client.erinCommands.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'This command no longer exists.', ephemeral: true });

        // owner only
        if (command.ownerOnly === 1) {
            if (interaction.user.id != o.id) {
                return interaction.reply({ content: `This is only a command Erin (<@${o.username}>) can use.`, flags: Discord.MessageFlags.Ephemeral });
            }
        }

        //mod only
        const modRoles = [...bot.servers.onenote.modRoles, ...bot.servers.mine.modRoles];
        let value = 0;
        if (command.modOnly === 1) {
            for (const ID of modRoles) {
                if (!interaction.member.roles.cache.has(ID)) {
                    value++
                }

                if (value == modRoles.length) {
                    return interaction.reply({ content: `This is a command only moderators can use. You do not have the required permissions. Moderators have the \`<@${modRoles[0]}>\` role.`, flags: Discord.MessageFlags.Ephemeral });
                }
            }
        }

        // botspam channel only
        const botspam = [bot.servers.onenote.botSpamChannelId, bot.servers.mine.botSpamChannelId, bot.servers.onenote.modBotSpamChannelId, bot.servers.mine.modBotSpamChannelId];
        if (command.botSpamOnly === 1) {
            if (!botspam.includes(interaction.channel.id)) {
                return interaction.reply({ content: `Please only use this command in the <#${botspam[0]}> channel. This command cannot be used elsewhere. Thank you.`, flags: Discord.MessageFlags.Ephemeral })
            }
        }

        // command cooldowns
        if (!client.slashCooldowns.has(interaction.commandName)) {
            client.slashCooldowns.set(interaction.commandName, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = client.slashCooldowns.get(interaction.commandName);
        const cooldownAmount = (command.cooldown || bot.defaultCooldown) * 1000;
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, ephemeral: true });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        // actually running the commands.
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            
            // Handle interaction timeout errors gracefully
            if (error.code === 10062 || error.message.includes('Unknown interaction')) {
                console.log('Interaction expired before response could be sent');
                return;
            }
            
            try {
                const embed = new Discord.EmbedBuilder()
                    .setColor(0x000000)
                    .setTitle('Oh no! An _error_ has appeared!')
                    .addFields({
                        name: '**Error Name:**',
                        value: `\`${error.name}\``
                    }, {
                        name: '**Error Message:**',
                        value: `\`${error.message}\``
                    }, {
                        name: '**Error Location:**',
                        value: `\`${error.stack}\``
                    }, {
                        name: '**This has been reported!**',
                        value: `I have pinged Erin so this has already been reported to her. You do not need to do anything else.`
                    })
                    .setTimestamp()
                    .setFooter({ text: `Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, icon_url: `${client.user.displayAvatarURL()}`, timestamp: new Date() });
                
                // Try to reply, but catch any additional errors
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({ content: `Hey, <@${o.id}>! You have an error!`, embeds: [embed] });
                }
            } catch (replyError) {
                console.error('Failed to send error message:', replyError.message);
            }
        }

    }
};