const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-role') // Name Of Slash Command
        .setDescription('Xoá vai trò ra khỏi người dùng')  // Description Of Slash Command
        // Selecting User To Remove Role
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Người bạn muốn xoá vai trò')
                .setRequired(true))
        // Selecting Role To Remove From User
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('Vai trò mà bạn muốn xoá')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles) // Permission To Use Command
        .setDMPermission(false)
    ,
    async execute(interaction, client) {
        const user = interaction.options.getMember('user') // Get User From Options
        const role = interaction.options.getRole('role') // Get Role From Options

        if (!user.roles.cache.has(role.id)) { // If User Doesn't Have Role
            await interaction.reply({ content: `${user} Doesn't Has ${role}`, ephemeral: true })
        } else { // If User Have Role
            const embed = new EmbedBuilder()
                .setTitle('Remove Role')
                .setDescription(`Bạn muốn xoá vai trò ${role} của ${user}\n\nChọn Yes hoặc No`)
                .setColor('Random')

            const buttons = new ActionRowBuilder()
                .addComponents( // Yes And No Buttons
                    new ButtonBuilder()
                        .setLabel('Yes')
                        .setCustomId('yes')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setLabel('No')
                        .setCustomId('no')
                        .setStyle(ButtonStyle.Danger)
                )

            const msg = await interaction.reply({ embeds: [embed], components: [buttons], fetchReply: true })

            // Button Collector
            const collector = msg.createMessageComponentCollector({
                filter: i => i.user.id === interaction.user.id,
                time: 40000 // Time WithIn You Have To React To Buttons // 40 Seconds
            })

            collector.on('collect', async i => {
                const id = i.customId
                const value = id

                if (value === 'yes') { // If Yes Button Is Selected
                    await interaction.followUp({ content: `Xoá thành công vai trò **${role.name}** của ${user}` })
                    user.roles.remove(role)
                    await i.update({ content: `Interaction Completed`, embeds: [embed], components: [] })
                    collector.stop()
                } else if (value === 'no') { // If No Button Is Selected
                    await interaction.followUp({ content: `Cancelled`, ephemeral: true })
                    await i.update({ content: `Interaction Completed`, embeds: [embed], components: [] })
                    collector.stop()
                }
            })

            collector.on('end', async collected => { // If Buttons Are Not Reacted In Time
                await interaction.editReply({ content: `Buttons Not Used In Time`, embeds: [embed], components: [] })
                collector.stop()
            })

        }

    }
}