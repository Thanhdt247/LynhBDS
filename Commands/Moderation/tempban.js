const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const ms = require('ms') // npm i ms

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempban')
        .setDescription('Tạm ban')
        // Seletcting User To Ban
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Người mà bạn muốn tạm ban')
                .setRequired(true)
        )
        // Time For You Want To Ban User
        .addStringOption(option =>
            option
                .setName('time')
                .setDescription('Thời gian tạm ban')
                .setRequired(true)
        )
        // Reason For Banning
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Lí do ban')
        )
        // Permission User Should Have To Use Command
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const time = interaction.options.getString('time')
        const reason = interaction.options.getString('reason') ?? 'Không có lí do !'
        const member = await interaction.guild.members.fetch(user.id)

        const banEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Temp Ban')
            .setDescription(`Temp Banned ${user.username} For ${reason}`)

        await interaction.reply({ embeds: [banEmbed] })
        await member.ban({ reason: reason })

        // UnBan After Time Is Finished
        setTimeout(async () => {
            const unbanEmbed = new EmbedBuilder()
                .setColor('Random')
                .setTitle('Temp UnBan')
                .setDescription(`${user.username} Has Been UnBanned After ${time}`)

            await interaction.channel.send({ embeds: [unbanEmbed] })

            await interaction.guild.members.unban(user)
        }, ms(time))
    }
}