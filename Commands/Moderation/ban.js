const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban mấy đứa láo nháo')
        // Seletcting User To Ban
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Người mà bạn muốn cấm')
                .setRequired(true)
        )
        // Reason For Banning
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Lý do cấm')
        )
        // Permission User Should Have To Use Command
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') ?? 'Không có lí do !'
        const member = await interaction.guild.members.fetch(user.id)

        const banEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('Ban')
        .setDescription(`Banned ${user.username} For ${reason}`)
        
        await interaction.reply({ embeds: [banEmbed] })
        await member.ban({ reason: reason })
    }
}