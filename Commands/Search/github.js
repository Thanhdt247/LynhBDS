const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const axios = require('axios').default // npm i axios
const moment = require('moment') // npm i moment

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github') // Name Of Slash Command
        .setDescription('Lấy thông tin về người dùng trên GitHub') // Description Of Slash Command
        // User On GitHub
        .addStringOption(option =>
            option
                .setName('user')
                .setDescription('Người dùng bạn muốn tìm kiếm trên GitHub')
                .setRequired(true)
        )
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getString('user')

        const url = `https://api.github.com/users/${user}` // API Of GitHub To Search For User

        let response
        try {
            response = await axios(url)
        } catch (e) {
            return await interaction.reply({ content: `Đã xảy ra lỗi, hãy thử lại sau\nCó lẽ \`${user}\` Không có trên GitHub`, ephemeral: true })
        }

        const githubEmbed = new EmbedBuilder()
            .setColor(`Random`)
            .setTitle(`${response.data.login}(${response.data.id})`)
            .setThumbnail(response.data.avatar_url)
            .setURL(response.data.html_url)
            .addFields(
                { name: `**Public Repos:**`, value: `${response.data.public_repos.toLocaleString()}`, inline: true }, // Public Repos Of User
                { name: `**Follower:**`, value: `${response.data.followers.toLocaleString()}`, inline: true }, // Followers Of User
                { name: `**Following:**`, value: `${response.data.following.toLocaleString()}`, inline: true }, // Following Of User
                { name: `**Email:**`, value: `${response.data.email ? response.data.email : 'No Email'}`, inline: true },  // Email Of User
                { name: `**Company:**`, value: `${response.data.company ? response.data.company : 'No Company'}`, inline: true },
                { name: `**Location:**`, value: `${response.data.location ? response.data.location : 'No Location'}`, inline: true },
                { name: `**Blog:**`, value: `${response.data.blog ? response.data.blog : 'No Blog'}`, inline: true },
                { name: `**Created At:**`, value: `${moment.utc(response.data.created_at).format('LLLL')}`, inline: true }, // Account Created Of User
                { name: `**Bio:**`, value: `${response.data.bio ? response.data.bio : 'No Bio'}`, inline: true },
            )

        await interaction.reply({ embeds: [githubEmbed] })
    }
}