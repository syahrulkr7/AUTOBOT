const axios = require('axios');

module.exports.config = {
 name: "arul",
 version: "1.0.0",
 role: 0,
 aliases: ["arul"],
 credits: "cliff",
cooldown: 0,
hasPrefix: false,
	usage: "",
};

module.exports.run = async function ({ api, event, args }) {
 const content = encodeURIComponent(args.join(" "));

 if (!content) {
	return api.sendMessage("🟢 Silakan Berikan pertanyaan Anda terlebih dahulu", event.threadID, event.messageID);
 }

 api.sendMessage("🟡  𝔸ℝ𝕌𝕃 𝔹𝕆𝕋 sedang mengetik Harap tunggu sebentar...", event.threadID, event.messageID); 

 const apiUrl = `https://bluerepoapislasttry.onrender.com/hercai?content=${content}`;

 try {
	const response = await axios.get(apiUrl);
	const reply = response.data.reply;

	api.sendMessage(reply, event.threadID, event.messageID);
 } catch (error) {
	console.error("Error fetching data:", error.message);
	api.sendMessage("An error occurred while processing your request.", event.threadID);
 }
};
