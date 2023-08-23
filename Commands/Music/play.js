const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, ButtonStyle } = require('discord.js')
const client = require('../../index')

module.exports = {
  premiumOnly: false,
  voteRequired: false,
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Chơi nhạc hoặc thêm nhạc vào hàng chờ')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Cung cấp tên hoặc URL cho bài hát')
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options, member, guild, channel } = interaction

    const query = options.getString('query')
    const voiceChannel = member.voice.channel

    const embed = new EmbedBuilder()

    if (!voiceChannel) {
      embed.setColor('#ff0000').setDescription('Bạn phải ở trong một kênh thoại để thực hiện lệnh âm nhạc')
      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    if (!member.voice.channelId == guild.members.me.voice.channelId) {
      embed.setColor('#ff0000').setDescription(`Bạn không thể sử dụng trình phát nhạc vì nó đã hoạt động trong <#${guild.members.me.voice.channelId}>`);
      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    try {
      client.distube.play(voiceChannel, query, { textChannel: channel, member: member })

      const queue = await client.distube.getQueue(voiceChannel)

      const pauseButton = new ButtonBuilder()
        .setCustomId('pause')
        .setLabel('Pause')
        .setStyle(ButtonStyle.Secondary)

      const skipButton = new ButtonBuilder()
        .setCustomId('skip')
        .setLabel('Skip')
        .setStyle(ButtonStyle.Primary)

      const resumeButton = new ButtonBuilder()
        .setCustomId('resume')
        .setLabel('Resume')
        .setStyle(ButtonStyle.Success)


      const stopButton = new ButtonBuilder()
        .setCustomId('stop')
        .setLabel('Stop')
        .setStyle(ButtonStyle.Danger)

      const loopButton = new ButtonBuilder()
        .setCustomId('loop')
        .setLabel('Loop')
        .setStyle(ButtonStyle.Success)

      const row = new ActionRowBuilder()
        .addComponents(pauseButton, skipButton, resumeButton, stopButton, loopButton)

      embed.setColor('Random').setDescription('🎶 Bạn có thể điều khiển nhạc bằng các nút bên dưới 🎶')

      const message = await interaction.reply({ embeds: [embed], components: [row] })

      // Add a listener for button interactions
      const filter = (i) => ['pause', 'skip', 'resume', 'stop', 'loop'].includes(i.customId) && i.user.id === interaction.user.id
      const collector = message.createMessageComponentCollector({ filter, time: 1500000 })

      collector.on('collect', async (i) => {
        if (i.customId === 'pause') {
          client.distube.pause(guild);
          embed.setDescription('⏸ Music paused.')
          await i.update({ embeds: [embed] })
        } else if (i.customId === 'skip') {
          client.distube.skip(guild);
          embed.setDescription('⏭️ Song skipped.')
          await i.update({ embeds: [embed] })
        } else if (i.customId === 'resume') {
  		client.distube.resume(guild);
  		embed.setDescription('▶️ Music resumed.')
  		await i.update({ embeds: [embed] })
        } else if (i.customId === 'stop') {
          client.distube.stop(guild);
          embed.setDescription('⏹️ Music stopped.')
          await i.update({ embeds: [embed] })
        } else if (i.customId === 'loop') {
          const toggle = client.distube.toggleAutoplay(guild)
          embed.setDescription(`🔁 Loop ${toggle ? 'enabled' : 'disabled'}.`)
          await i.update({ embeds: [embed] })
        }
      })

      collector.on('end', () => {
        // Remove the buttons after the collector expires
        message.edit({ components: [] })
      })
    } catch (err) {
      console.log(err);

      embed.setColor('#ff0000').setDescription('⛔ | Đã xảy ra sự cố...')

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }
  },
}