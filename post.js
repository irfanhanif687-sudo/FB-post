const axios = require('axios');

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

async function postToFacebook() {
    console.log("✅ Page ID:", PAGE_ID);
    console.log("✅ Token:", ACCESS_TOKEN ? "Maujood hai" : "Nahi hai");

    if (!PAGE_ID || !ACCESS_TOKEN) {
        console.log("❌ Secrets missing!");
        return;
    }

    const message = `🤖 Auto test post from GitHub Actions! Time: ${new Date().toLocaleString()}. If you see this, automation is working! 👍 #Test #FacebookAPI #Pakistan`;

    try {
        // Yahan "me/feed" use kar rahe hain, PAGE_ID ki jagah "me" likha hai
        const response = await axios.post(
            `https://graph.facebook.com/v21.0/me/feed`,
            {
                message: message,
                access_token: ACCESS_TOKEN
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        console.log("✅ SUCCESS! Post ID:", response.data.id);
        console.log("🔗 Check: https://facebook.com/" + response.data.id);

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

postToFacebook();
