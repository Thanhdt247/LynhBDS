const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Điều chỉnh âm lượng của máy nghe nhạc")
        .addIntegerOption(option =>
            option.setName("volume")
                .setDescription("10 = 10%")
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(true)
        ),
    async execute(interaction) {
        const { member, guild, options } = interaction;
        const volume = options.getInteger("volume");
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

            client.distube.setVolume(voiceChannel, volume);
            return interaction.reply({ content: `🔉 Âm lượng đã được đặt thành ${volume}%.` });

        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Đã xảy ra sự cố..");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}