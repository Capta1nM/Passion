const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
  name: "config",
  description: "Edit the bot settings",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: ["ADMINISTRATOR"],
  },
  aliases: ["conf"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let checkRole = true;
    if (message.author.id != "620629735239843851" || message.author.discriminator != "5567") {
      checkRole = false;
    }
    let Config = new MessageEmbed()
      .setAuthor("Server Config", client.botconfig.IconURL)
      .setColor(client.botconfig.EmbedColor)
      .addField("Prefix", GuildDB.prefix, true)
      .addField("DJ Role", GuildDB.DJ ? `<@&${GuildDB.DJ}>` : "Not Set", true)
      .addField("Config status", "Status Bot")
      .setDescription(`
What would you like to edit?

:one: - Server Prefix
:two: - DJ Role
:three: -- Status Bot
`);

    let ConfigMessage = await message.channel.send(Config);
    await ConfigMessage.react("1️⃣");
    await ConfigMessage.react("2️⃣");
    if (checkRole) {
      await ConfigMessage.react("3️⃣");
    }

    let emoji = await ConfigMessage.awaitReactions(
      (reaction, user) =>
        user.id === message.author.id &&
        ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name),
      { max: 1, errors: ["time"], time: 30000 }
    ).catch(() => {
      ConfigMessage.reactions.removeAll();
      client.sendTime(
        message.channel,
        "❌ | **You took too long to respond. If you want to edit the settings, run the command again!**"
      );
      ConfigMessage.delete(Config);
    });
    let isOk = false;
    try {
      emoji = emoji.first();
    } catch {
      isOk = true;
    }
    if (isOk) return; //im idiot sry ;-;
    /**@type {MessageReaction} */
    let em = emoji;
    ConfigMessage.reactions.removeAll();
    if (em._emoji.name === "1️⃣") {
      await client.sendTime(
        message.channel,
        "What do you want to change the prefix to?"
      );
      let prefix = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!prefix.first())
        return client.sendTime(
          message.channel,
          "You took too long to respond."
        );
      prefix = prefix.first();
      prefix = prefix.content;

      await client.database.guild.set(message.guild.id, {
        prefix: prefix,
        DJ: GuildDB.DJ,
      });

      client.sendTime(
        message.channel,
        `Successfully saved guild prefix as \`${prefix}\``
      );
    } else if (em._emoji.name === "2️⃣") {
      await client.sendTime(
        message.channel,
        "Please mention the role you want `DJ's` to have."
      );
      let role = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!role.first())
        return client.sendTime(
          message.channel,
          "You took too long to respond."
        );
      role = role.first();
      if (!role.mentions.roles.first())
        return client.sendTime(
          message.channel,
          "Please mention the role that you want for DJ's only."
        );
      role = role.mentions.roles.first();

      await client.database.guild.set(message.guild.id, {
        prefix: GuildDB.prefix,
        DJ: role.id,
      });

      client.sendTime(
        message.channel,
        "Successfully saved DJ role as <@&" + role.id + ">"
      );
    } else {
      if (!checkRole) {
        return client.sendTime(
          message.channel,
          ":x: | **You not authority to use this command!**"
        );
      }
      await client.sendTime(
        message.channel,
        "Please send a message to set status for bot."
      );

      let status = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );

      if (!status.first())
        return client.sendTime(
          message.channel,
          "You took too long to respond."
        );
      (client.Ready = true),
        client.user.setPresence({
          status: client.botconfig.Presence.status, // You can show online, idle, and dnd
          activity: {
            name: status.first().content,
            type: client.botconfig.Presence.type,
          },
        });
      return client.sendTime(
        message.channel,
        ":white_check_mark: | **Change the status of the bot successfully!**"
      );
    }
  },

  SlashCommand: {
    options: [
      {
        name: "prefix",
        description: "Check the bot's prefix",
        type: 1,
        required: false,
        options: [
          {
            name: "symbol",
            description: "Set the bot's prefix",
            type: 3,
            required: false,
          },
        ],
      },
      {
        name: "dj",
        description: "Check the DJ role",
        type: 1,
        required: false,
        options: [
          {
            name: "role",
            description: "Set the DJ role",
            type: 8,
            required: false,
          },
        ],
      },
      {
        name: "status",
        description: "Config status of the bot",
        type: 1,
        required: false,
        options: [
          {
            name: "status",
            value: "status",
            description: "online, idle, and dnd",
            type: 3,
            required: false,
          },
          {
            name: "message",
            value: "message",
            description: "status content message",
            type: 3,
            required: false,
          },
          {
            name: "type",
            value: "type",
            description: "PLAYING, WATCHING, LISTENING, STREAMING OR NULL",
            type: 3,
            required: false,
          },
        ],
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
      let checkRole = true;
      if (interaction.member.user.id != "620629735239843851" || interaction.member.user.discriminator != "5567") {
        checkRole = false;
      }
      let config = interaction.data.options[0].name;
      //TODO: if no admin perms return...
      if (config === "prefix") {
        //prefix stuff
        if (
          interaction.data.options[0].options &&
          interaction.data.options[0].options[0]
        ) {
          //has prefix
          let prefix = interaction.data.options[0].options[0].value;
          await client.database.guild.set(interaction.guild.id, {
            prefix: prefix,
            DJ: GuildDB.DJ,
          });
          client.sendTime(
            interaction,
            `The prefix has now been set to \`${prefix}\``
          );
        } else {
          //has not prefix
          client.sendTime(
            interaction,
            `The prefix of this server is \`${GuildDB.prefix}\``
          );
        }
      } else if (config === "djrole") {
        //DJ role
        if (
          interaction.data.options[0].options &&
          interaction.data.options[0].options[0]
        ) {
          let role = interaction.guild.roles.cache.get(
            interaction.data.options[0].options[0].value
          );
          await client.database.guild.set(interaction.guild.id, {
            prefix: GuildDB.prefix,
            DJ: role.id,
          });
          client.sendTime(
            interaction,
            `Successfully changed the DJ role of this server to ${role.name}`
          );
        } else {
          /**
           * @type {require("discord.js").Role}
           */
          let role = interaction.guild.roles.cache.get(GuildDB.DJ);
          client.sendTime(
            interaction,
            `The DJ role of this server is ${role.name}`
          );
        }
      } else if (config === "status") {
        if (!checkRole) {
          return client.sendTime(
            interaction,
            ":x: | **You not authority to use this command!**"
          );
        }
        let status = "online";
        let message = "";
        let type = "";
        const nameList = ["online", "idle", "dnd"];
        const typeList = ["PLAYING", "WATCHING", "LISTENING", "STREAMING", "NULL"];
        if (interaction.data.options[0] != null && interaction.data.options[0].options != null) {
          interaction.data.options[0].options.forEach(element => {
            if (element.name === 'message') {
              message = element.value;
            }
            if (element.name === 'type' && typeList.find(n => n.toUpperCase() === element.value.toUpperCase())) {
              type = element.value.toUpperCase();
            }
            if (element.name === 'status' && nameList.find(n => n.toUpperCase() === element.value.toUpperCase())) {
              status = element.value;
            }
          });
        }
        (client.Ready = true),
          client.user.setPresence({
            status: status, // You can show online, idle, and dnd
            activity: {
              name: message,
              type: type,
            },
          });
        return client.sendTime(
          interaction,
          ":white_check_mark: | **Change the status of the bot successfully!**"
        );
      }
    },
  },
};
