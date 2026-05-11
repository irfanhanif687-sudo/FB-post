const axios = require('axios');

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

async function main() {
    console.log("🚀 Starting...");
    console.log("Page ID:", PAGE_ID);
    console.log("Token exists:", TOKEN ? "✅ Yes" : "❌ No");

    if (!PAGE_ID || !TOKEN) {
        console.log("❌ Secrets missing!");
        return;
    }

    const message = `🤖 Auto post from GitHub Actions! Time: ${new Date().toLocaleString()} - System working perfectly! 🎉 #AutoPost #FacebookAPI`;

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v21.0/${PAGE_ID}/feed`,
            {
                message: message,
                access_token: TOKEN
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
        console.log("✅ SUCCESS! Post ID:", response.data.id);
        console.log("🔗 Link: https://facebook.com/" + response.data.id);
        
    } catch (error) {
        console.log("❌ ERROR:");
        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Message:", error.response.data.error.message);
        } else {
            console.log(error.message);
        }
    }
}

main();
