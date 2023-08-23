const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('dm')
        // Seletcting User To Kick
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to DM')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('The message to DM')
        ),

    async execute(interaction, client) {
        const {channel, options} = interaction

        const user = options.getMember('user')
        const message = options.getString('message')


        if(user.id == '1114326459885039716') {
            return await interaction.reply({
                content: "**I can't DM myself lol**"
            })
            .catch((err) => {})
        }

        user.send(message).catch(async (err) => {
            console.log(err)

            return await interaction.editReply({
                content: `Failed to send message, please try again`
            })
            .catch((err) => {})
        })

        await interaction.reply({
            content: `**${message}**Succesfully sent to **${user}**! (this message will autodelete)`
        })
        .catch((err) => {})

        await setTimeout(() => { interaction.deleteReply()}, 3500)

    },
}