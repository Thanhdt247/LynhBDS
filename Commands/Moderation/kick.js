const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Đá đít mấy đứa phạm luật ra khỏi server')
        // Seletcting User To Kick
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Người mà bạn muốn kick')
                .setRequired(true)
        )
        // Reason For Kicking
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Lí do kick')
        )
        // Permission User Should Have To Use Command
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') ?? 'Không có lí do !'
        const member = await interaction.guild.members.fetch(user.id)

        const kickEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('Kick')
        .setDescription(`Kicked ${user.username} For ${reason}`)
        
        await interaction.reply({ embeds: [kickEmbed] })
        await member.kick({ reason: reason })
    }
}