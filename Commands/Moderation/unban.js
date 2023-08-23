const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Gỡ lệch cấm')
        // Seletcting User To UnBan
        .addStringOption(option =>
            option
                .setName('userid')
                .setDescription('ID của đứa bị ban')
                .setRequired(true)
        )
        // Reason For UnBanning
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Lí do unban')
        )
        // Permission User Should Have To Use Command
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getString('userid')
        const reason = interaction.options.getString('reason') ?? 'Không có lí do !'

        try {
            const unbanEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('UnBan')
            .setDescription(`UnBanned ${user.user.username} For ${reason}`)
            
            await interaction.reply({ embeds: [unbanEmbed] })
            await interaction.guild.members.unban(user)
        } catch (err) {
            const errorunbanEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('UnBan Error')
            .setDescription(`Provide Valid User ID`)
            
            await interaction.reply({ embeds: [errorunbanEmbed] })
            console.log(err)
        }
    }
}