const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("Hiển thị thông tin về bài hát đang phát"),
    async execute(interaction) {
        const { member, guild } = interaction;
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if (!voiceChannel) {
            embed.setColor("Red").setDescription("Bạn phải ở trong một kênh thoại để thực hiện lệnh âm nhạc");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`Bạn không thể sử dụng trình phát nhạc vì nó đã hoạt động trong <#${guild.members.me.voice.channelId}>`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {

            const queue = await client.distube.getQueue(voiceChannel);

            if (!queue) {
                embed.setColor("Red").setDescription("Không có hàng đợi đang hoạt động");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            const song = queue.songs[0];
            embed.setColor("Blue").setDescription(`🎶 **Hiện đang phát: ** \`${song.name}\` - \`${song.formattedDuration}\`.\n**Link:** ${song.url}`).setThumbnail(song.thumbnail);
            return interaction.reply({ embeds: [embed], ephemeral: true });

        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Đã xảy ra sự cố...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}