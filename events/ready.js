const { Events } = require("discord.js");
const { initDb } = require("../DB/db");
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    console.log("Connecting to DB..");
    await initDb();
    console.log("Connected to DB");
  },
};
