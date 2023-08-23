const { SlashCommandBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, PermissionFlagsBits, InteractionResponse } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Shop của Lynh"),
    async execute(interaction, client) {
        const shop = {
            color: 0xfa1040,
            title: "<a:Evolving_badge_Nitro_a_scaling:1068368650576351252> **SHOP CHÚNG MÌNH Ở ĐÂY CÓ BÁN** <a:Evolving_badge_Nitro_a_scaling:1068368650576351252>",
            description: "<a:Arrow_Right_RGB:1114537987573813288> <a:Payments:1068370048164565032> : **50K :money_with_wings:  /  ** *1 month*\n\n<a:Arrow_Right_RGB:1114537987573813288> <a:Payment_Nitro_Classic:1114542718518042714>: **25K :money_with_wings:  / ** *1 month*\n\n:credit_card:  **__PAYMENT METHOD__** :credit_card: \n<:Boost:1068370126442868807> *Type `/thanhtoan` để xem phương thức thanh toán <:Yanfei_Doubt:1068184571348267150>*",
            image: {
                url: "https://i.pinimg.com/564x/7b/29/ec/7b29ec6bdd88166252718c5a1b40dca9.jpg"
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: "Cảm ơn bạn quan tâm đến shop của mình !",
                icon_url: "https://i.pinimg.com/564x/7e/01/24/7e01246f666471aee86e138e3633ba94.jpg"
            }

        }

        const lienhe = {
            color: 0xfa1040,
            title: "**LIÊN HỆ QUA ZALO HOẶC DISCORD**",
            description: "**__ZALO:__** ```0352667207 ```\n**__DISCORD:__** ```Lynh#7248```",
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
        const msg = await interaction.reply({ embeds: [shop], components: [button], fetchReply: true })
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