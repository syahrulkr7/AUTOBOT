const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    description: "EDUCATIONAL",
    hasPrefix: false,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
    const question = args.join(' ');
    
    if (!question) return api.sendMessage("Hai, senang bertemu denganmu! Aku Aruna, temanmu yang ramah, dan siap membantu. Kamu bisa bertanya padaku tentang jawaban, rekomendasi, saran, atau apapun yang ada di pikiranmu:)", event.threadID, event.messageID);

    try {
        api.sendMessage("Mohon tunggu sebentar sayang😁😁...", event.threadID, event.messageID);

        const userInput = encodeURIComponent(question);
        const uid = event.senderID;
        const apiUrl = `https://deku-rest-api.replit.app/gpt4?prompt=${userInput}&uid=${uid}`;
        
        const response = await axios.get(apiUrl);
        const answer = response.data.gpt4;

        const timeString = moment.tz('Asia/Manila').format('LLLL');

        api.sendMessage({
            body: `🖤 𝕒𝕣𝕦𝕟𝕒 🖤\n━━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${question}\n━━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n\nThis bot was created by arul\n
𝗣⃪𝗼⃪𝗴⃪𝗶⃪:
${timeString}\n\nFOLLOW THE DEVELOPER: https://www.facebook.com/profile.php?id=100089127638756.`
        }, event.threadID, (error, info) => {
            if (error) {
                console.error(error);
                api.sendMessage("An error occurred while sending the message.", event.threadID);
            }
        });
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
