const { MessageEmbed, Client } = require("discord.js");

module.exports = {
  name: "notification",
  description: "sent one notification to all server",
  usage: "[notification]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["n"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {

    // client.guilds.cache.forEach(guild => {

    //   // console.log(guild.channels.cache);
    //   // console.log("cache: ", guild.channels.cache.forEach(g => {
    //   //   if(g.type === "text"){
    //   //   console.log('g la: ', g.name)
    //   //   }
    //   // }));

    //     // const channel = guild.channels.cache.find(c => c.type === 'text'  ) 

    //     // console.log("channel: ", channel)
    //     let embed = new MessageEmbed()
    //       .setAuthor("🌹🌹🌹🌹🌷🌷🌷🌷")
    //       .setTitle("Happy Vietnamese Women's Day")
    //       .addFields({ name : "Chúc em's ngày 20/10 thật vui vẻ. Hãy luôn dịu dàng, tràn đầy năng lượng và thật cưng chiều bản thân nhé các cô gái   ❤❤❤.",
    //                 value : "\n Tặng cho bông hoa nè 🌹",
    //                 inline : true
    // })
    //       .setColor(client.botconfig.EmbedColor)
    //       .setFooter(
    //         "------------------------------ Bot xin thay mặt anh's :3 -----------------------------------", client.botconfig.IconSent
    //       );
    // guild.channels.cache.forEach(channel => {
    //     if(channel.type === "text"){
    //     if(channel) channel.send(embed)
    //        .then(() => console.log('Sent on ' + channel.name))
    //        .catch(console.error)
    //     else console.log('On guild ' + guild.name + ' I could not find a channel where I can type.')
    //     }
    //   })
    // })

    const channel = client.channels.cache.find(c => c.type === 'text')
    let embed = new MessageEmbed()
      .setAuthor("1")
      .setTitle("1")
      .addFields({
        name: "1",
        value: "\n 1",
        inline: true
      })
      .setColor(client.botconfig.EmbedColor)
      .setFooter(
        " --- 2022@Copyright by Passion ---", client.botconfig.IconSent
      );
    if (channel) channel.send(embed)
      .then(() => console.log('Sent on ' + channel.name))
      .catch(console.error)
  },


  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const channel = client.channels.cache.find(c => c.type === 'text');
      let embed = new MessageEmbed()
        .setAuthor("1")
        .setTitle("1")
        .addFields({
          name: "1",
          value: "\n 1",
          inline: true
        })
        .setColor(client.botconfig.EmbedColor)
        .setFooter(
          " --- 2022@Copyright by Passion ---", client.botconfig.IconSent
        );
      if (channel) channel.send(embed)
        .then(() => console.log('Sent on ' + channel.name))
        .catch(console.error)
    },
  },
};
