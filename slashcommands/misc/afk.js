const { EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: 'afk',
    description: 'Set yourself as AFK with an optional message and duration',
    usage: '/afk [message] [duration]',
    example: '/afk "Working on a project" 2h',
    options: [
        {
            name: 'message',
            description: 'Message to show when someone pings you (optional)',
            required: false,
            type: 3
        },
        {
            name: 'duration',
            description: 'How long to stay AFK (e.g., 30m, 2h, 1d) - default is until you send a message',
            required: false,
            type: 3
        }
    ],
    async execute(interaction) {
        // Defer the reply to prevent timeout
        await interaction.deferReply();
        
        const message = interaction.options.getString('message') || 'I am currently AFK';
        const durationInput = interaction.options.getString('duration');
        
        // Parse duration
        let durationMs = null;
        let durationText = 'until you send a message';
        
        if (durationInput) {
            const durationMatch = durationInput.match(/^(\d+)([mhd])$/i);
            if (durationMatch) {
                const value = parseInt(durationMatch[1]);
                const unit = durationMatch[2].toLowerCase();
                
                switch (unit) {
                    case 'm':
                        durationMs = value * 60 * 1000;
                        durationText = `${value} minute${value !== 1 ? 's' : ''}`;
                        break;
                    case 'h':
                        durationMs = value * 60 * 60 * 1000;
                        durationText = `${value} hour${value !== 1 ? 's' : ''}`;
                        break;
                    case 'd':
                        durationMs = value * 24 * 60 * 60 * 1000;
                        durationText = `${value} day${value !== 1 ? 's' : ''}`;
                        break;
                }
            } else {
                return await interaction.followUp({
                    content: '❌ Invalid duration format. Use format like: 30m, 2h, 1d',
                    ephemeral: true
                });
            }
        }
        
        // Store AFK data
        if (!interaction.client.afkUsers) {
            interaction.client.afkUsers = new Map();
        }
        
        const afkData = {
            message: message,
            timestamp: Date.now(),
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            userId: interaction.user.id
        };
        
        if (durationMs) {
            afkData.expiresAt = Date.now() + durationMs;
            
            // Set timeout for auto-removal
            setTimeout(async () => {
                if (interaction.client.afkUsers && interaction.client.afkUsers.has(afkData.userId)) {
                    interaction.client.afkUsers.delete(afkData.userId);
                    
                    // Remove (AFK) from nickname when duration expires
                    try {
                        const guild = await interaction.client.guilds.fetch(afkData.guildId);
                        const member = await guild.members.fetch(afkData.userId);
                        const currentNick = member.displayName;
                        
                        if (currentNick.endsWith(' (AFK)')) {
                            const newNick = currentNick.replace(' (AFK)', '');
                            await member.setNickname(newNick === member.user.username ? null : newNick);
                        }
                    } catch (error) {
                        if (error.code === 50013) {
                            console.log(`Cannot update nickname after AFK expiry: Missing permissions (role hierarchy)`);
                        } else {
                            console.error('Error updating nickname after AFK expiry:', error);
                        }
                    }
                    
                    try {
                        const channel = await interaction.client.channels.fetch(afkData.channelId);
                        const notificationMessage = await channel.send(`<@${afkData.userId}> Your AFK period has ended!`);
                        
                        // Delete notification after 1 minute
                        setTimeout(() => {
                            notificationMessage.delete().catch(() => {});
                        }, 60000);
                    } catch (error) {
                        console.error('Error sending AFK expiry notification:', error);
                    }
                }
            }, durationMs);
        }
        
        interaction.client.afkUsers.set(interaction.user.id, afkData);
        
        // Update nickname to add (AFK)
        try {
            const member = await interaction.guild.members.fetch(interaction.user.id);
            const currentNick = member.displayName;
            
            // Only add (AFK) if it's not already there
            if (!currentNick.endsWith('(AFK)')) {
                await member.setNickname(`${currentNick} (AFK)`);
            }
        } catch (error) {
            if (error.code === 50013) {
                console.log(`Cannot update nickname for ${interaction.user.tag}: Missing permissions (role hierarchy)`);
            } else {
                console.error('Error updating nickname for AFK:', error);
            }
            // Continue even if nickname update fails
        }
        
        const embed = new EmbedBuilder()
            .setColor(0xFFD700)
            .setTitle('💤 AFK Status Set')
            .setDescription(`You are now AFK for **${durationText}**`)
            .addFields(
                {
                    name: '📝 Message',
                    value: message,
                    inline: false
                }
            )
            .setTimestamp()
            .setFooter({ text: 'Send any message to remove your AFK status' });
        
        await interaction.followUp({ embeds: [embed] });
    }
};
