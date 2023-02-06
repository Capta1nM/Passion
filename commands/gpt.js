const { MessageEmbed, Client } = require("discord.js");
const { Configuration, OpenAIApi } = require('openai');
const botconfig = require("../botconfig");
const configuration  = new Configuration({apiKey:botconfig.OpenAPISecret});;
const openai = new OpenAIApi(configuration);
let prompt = '';
module.exports = {
    name: "gpt",
    description: "Information about the bot",
    usage: "[commands]",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: [],
    },
    aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (message.author.bot || message.channel.id != '881798164045258765') return;
  
    prompt += `You: ${message.content}\n`;
    
    openai.createCompletion({
      model: 'text-davinci-002-render',
      prompt,
      max_tokens: 3000,
      temperature: 0.3,
      top_p: 0.3,
      presence_penalty: 0,
      frequency_penalty: 0.5,
    }).then((gptResponse) => {
        message.reply(gptResponse.data.choices[0].text.substring(0));
        console.log('Answer Reply!');
        prompt += `${gptResponse.data.choices[0].text}\n`;
    });
  },

  SlashCommand: {
    options: [
      {
        name: "chatgpt",
        value: "chatgpt",
        type: 3,
        required: true,
        description: "Chat with GPT",
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
        prompt += `You: ${interaction.data.options[0].value}\n`;
        // console.log(interaction);
        // interaction.reply("wait");
        // console.log(interaction.guild.);
        // client.sendTime(
        //   interaction,
        //   startTyping()
        // );
        const guild = client.guilds.cache.get(interaction.guild_id);
        const channel = guild.channels.cache.get(interaction.channel_id)
        channel.startTyping();
        var p2 = new Promise((resolve,reject)=>{ setTimeout(resolve, 300000, new Error('timeout')); });
       
        Promise.race([
          openai.createCompletion({
            model: 'text-davinci-002-render',
            prompt,
            max_tokens: 4097,
            temperature: 0.3,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
          }),
          p2
        ]).then((gptResponse)=>{
          if(gptResponse instanceof Error) {
              console.warn(Error);
          } else {
              let embed = new MessageEmbed()
              .setAuthor("Request by: " + interaction.member.user.username)
              .setTitle(interaction.member.user.username + ": " +interaction.data.options[0].value)
              .addFields({
                name: " ",
                value: gptResponse.data.choices[0].text.substring(0),
                inline: true
              })
              .addField("How to use?", "Use command: /gpt", false)
              .setColor(client.botconfig.EmbedColor)
              .setFooter(
                " --- 2022@Copyright by Passion ---", client.botconfig.IconSent
              );
              channel.stopTyping();
              if(channel) channel.send(embed)
              .then(() => console.log('Sent on ' + channel.name))
              .catch(console.error)
                prompt += `${gptResponse.data.choices[0].text}\n`;
          }
        })

        // gptResponse = openai.createCompletion({
        //   model: 'text-davinci-003',
        //   prompt,
        //   max_tokens: 3000,
        //   temperature: 0.3,
        //   top_p: 0.3,
        //   presence_penalty: 0,
        //   frequency_penalty: 0.5,
        // }).then((gptResponse) => {
        //   let embed = new MessageEmbed()
        //   .setAuthor(interaction.member.user.username)
        //   .setTitle(interaction.data.options[0].value)
        //   .addFields({
        //     name: " ",
        //     value: gptResponse.data.choices[0].text.substring(0),
        //     inline: true
        //   })
        //   .setColor(client.botconfig.EmbedColor)
        //   .setFooter(
        //     " --- 2022@Copyright by Passion ---", client.botconfig.IconSent
        //   );
        //   if(interaction) interaction.send(embed)
        //   .then(() => console.log('Sent on ' + interaction.name))
        //   .catch(console.error)
        //     prompt += `${gptResponse.data.choices[0].text}\n`;
        // });
    },
  },
};
