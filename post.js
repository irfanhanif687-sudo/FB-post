const axios = require('axios');

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

async function generatePost() {
    try {
        const prompt = "Write a short Facebook post in Roman Urdu about Pakistan technology. Max 500 characters. Add emojis and 3 hashtags.";
        const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return "Assalam o Alaikum! 🇵🇰 Aaj ka naya post! Like aur share karo! 😊 #Pakistan #Tech";
    }
}

async function postToFacebook(message) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${PAGE_ID}/feed`,
            new URLSearchParams({
                message: message,
                access_token: ACCESS_TOKEN
            })
        );
        console.log("✅ Posted!");
    } catch (error) {
        console.log("❌ Failed");
    }
}

async function main() {
    console.log("Starting...");
    const post = await generatePost();
    await postToFacebook(post);
}

main();