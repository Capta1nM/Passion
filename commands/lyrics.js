const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");

module.exports = {
  name: "lyrics",
  description: "Shows the lyrics of the song searched",
  usage: "[Song Name]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["ly"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    let SongTitle = args.join(" ");
    let SearchString = args.join(" ");
    if (!args[0] && !player)
      return client.sendTime(
        message.channel,
        "❌ | **Nothing is playing right now...**"
      );
    if (!args[0]) SongTitle = player.queue.current.title;
    SongTitle = SongTitle.replace(
      /lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi,
      ""
    );

    let lyrics = await lyricsFinder(SongTitle);
    if (!lyrics)
      return client.sendTime(
        message.channel,
        `**No lyrics found for -** \`${SongTitle}\``
      );
    lyrics = lyrics.split("\n"); //spliting into lines
    let SplitedLyrics = _.chunk(lyrics, 40); //45 lines each page

    let Pages = SplitedLyrics.map((ly) => {
      let em = new MessageEmbed()
        .setAuthor(`Lyrics for: ${SongTitle}`, client.botconfig.IconURL)
        .setColor(client.botconfig.EmbedColor)
        .setDescription(ly.join("\n"));

      if (args.join(" ") !== SongTitle)
        em.setThumbnail(player.queue.current.displayThumbnail());

      return em;
    });

    let lyric = "I love you, i miss you :<"
    if (!Pages.length || Pages.length >= 1) {
      lyric = "";
      Pages.forEach(p => {
        lyric += "\n" + p.description;
      })
    }
    if(lyric.length>1)
    return client.sendTime(
      message.channel,
      lyric
    );
    else return client.sendTime(
      message.channel,
      "I love you, i miss you :<"
    );

  },

  SlashCommand: {
    options: [
      {
        name: "song",
        value: "song",
        type: 3,
        description: "Enter a song name to search",
        required: false,
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
      let player = await client.Manager.get(interaction.guild_id);
      if (!interaction.data.options && !player)
        return client.sendTime(
          interaction,
          "❌ | **Nothing is playing right now...**"
        );
      
      SongTitle = interaction.data.options
        ? interaction.data.options[0].value
        : player.queue.current.title;
      let lyrics = await lyricsFinder(SongTitle);
      if (lyrics.length === 0)
        return client.sendTime(
          interaction,
          `**No lyrics found for -** \`${SongTitle}\``
        );
      lyrics = lyrics.split("\n"); //spliting into lines
      let SplitedLyrics = _.chunk(lyrics, 40); //45 lines each page
      let Pages = SplitedLyrics.map((ly) => {
        let em = new MessageEmbed()
          .setAuthor(`Lyrics for: ${SongTitle}`, client.botconfig.IconURL)
          .setColor(client.botconfig.EmbedColor)
          .setDescription(ly.join("\n"));

        if (SongTitle !== SongTitle)
          em.setThumbnail(player.queue.current.displayThumbnail());

        return em;
      });

      let lyric = "I love you, i miss you :<"
      if (!Pages.length || Pages.length >= 1) {
        lyric = ""; 
        Pages.forEach(p => {
          lyric += "\n" + p.description;
        })
      }z``
      if(lyric.length>1)
      return client.sendTime(
        interaction,
        lyric
      );
      else return client.sendTime(
        interaction,
        "I love you, i miss you :<"
      );
    },
  },
};
