const { SlashCommandBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, PermissionFlagsBits, InteractionResponse } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("thanhtoan")
        .setDescription("Thanh toán mua hàng"),
    async execute(interaction) {
        const thanhtoan = {
            color: 0xfa4895,
            title: "**PHƯƠNG THỨC THANH TOÁN **",
            description: "**TÊN CHỦ TÀI KHOẢN: __NGUYEN VAN THANH__** <:MoMo_Logo:1114707288826064917>**/**<:mb_bank_logo:1114710107222192208>\n**GÕ:** ***`/shop` để xem giá hàng !***",
            image: {
                url: "https://i.pinimg.com/564x/cb/3b/d9/cb3bd9ecec008b327686e38d1124022e.jpg"
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: "Cảm ơn bạn quan tâm đến shop của mình !",
                icon_url: "https://i.pinimg.com/564x/7e/01/24/7e01246f666471aee86e138e3633ba94.jpg"
            } 

        }
        // DM
        const lienhe = {
            color: 0xfa1040,
            title: "**LIÊN HỆ QUA ZALO HOẶC DISCORD**",
            description: "**__ZALO:__** ```0943975579 ```\n**__DISCORD:__** ```Lynh#7248```",
            image: {
                url: "https://pic.bstarstatic.com/ugc/cd96bc80ac8803823c4220dec69ae014.jpg@960w_540h_1e_1c_1f.webp"
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: "Cảm ơn bạn quan tâm đến shop của mình !",
                icon_url: "https://i.pinimg.com/564x/7e/01/24/7e01246f666471aee86e138e3633ba94.jpg"
            } 
        }
        // Add Button
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('dm')
            .setLabel('DM')
            .setStyle(ButtonStyle.Primary),
        )
        const msg = await interaction.reply({ embeds: [thanhtoan], components: [button], fetchReply: true })
        // Button Collector
        const collector = msg.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 40000 // Time WithIn You Have To React To Buttons // 40 Seconds
        })
        collector.on('collect', async i => {
            const id = i.customId
            const value = id

            if(value === 'dm') {
                await i.update({ embeds: [lienhe], components: [] }),
                collector.stop()
            }
        })
    },

}