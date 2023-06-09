const { ChatInputCommandInteraction, EmbedBuilder, Client } = require("discord.js")
const { Configuration, OpenAIApi } = require("openai")
require('dotenv').config()


module.exports = {
    subCommand: "gpt.chat",

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */

async execute(interaction, client) {
    await interaction.deferReply()
    interaction.editReply({ embeds: [new EmbedBuilder().setAuthor({ name: `${client.user.username} is generating response...`, iconURL: client.user.displayAvatarURL() })] })
    
        try {
            const configuration = new Configuration({
                apiKey: process.env.openai,
            })

            const openai = new OpenAIApi(configuration)
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: interaction.options.getString("prompt"),
                temperature: 0,
                max_tokens: 1500
                //max_tokens: 2048
            }) 

            const Embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`**${interaction.options.getString("prompt")}**\n\n\`\`\`${response.data.choices[0].text}\`\`\``)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()
                .setFooter({ text: client.user.username })

            return interaction.editReply({ embeds: [Embed] })
        } catch (error) {
            if (error) console.log(error)

            return interaction.editReply({embeds: [new EmbedBuilder().setAuthor({ name: `Something went wrong... Please try again later!`, iconURL: client.user.displayAvatarURL() })]})
        }

    }
}