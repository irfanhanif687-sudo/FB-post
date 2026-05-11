const axios = require('axios');

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

console.log("Page ID:", PAGE_ID ? "✅ Found" : "❌ Missing");
console.log("Token:", ACCESS_TOKEN ? "✅ Found" : "❌ Missing");

async function generatePost() {
    try {
        // Simple fallback post - pehle test karo
        return "Assalam o Alaikum! 🇵🇰 This is a test post from GitHub Actions! 😊 Like aur share karo! #FacebookAutoPost #Pakistan #Test";
        
    } catch (error) {
        console.log("AI Error:", error.message);
        return "Test post from GitHub Actions! 🤖 #AutoPost";
    }
}

async function postToFacebook(message) {
    try {
        console.log("Posting to Facebook...");
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${PAGE_ID}/feed`,
            new URLSearchParams({
                message: message,
                access_token: ACCESS_TOKEN
            })
        );
        console.log("✅ SUCCESS! Post ID:", response.data.id);
        return true;
    } catch (error) {
        console.log("❌ Facebook Error Details:");
        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Error:", error.response.data);
        } else {
            console.log("Error:", error.message);
        }
        return false;
    }
}

async function main() {
    console.log("🚀 Starting auto-post...");
    
    if (!PAGE_ID || !ACCESS_TOKEN) {
        console.log("❌ CRITICAL: Secrets missing! Check GitHub Secrets.");
        return;
    }
    
    const post = await generatePost();
    console.log("📝 Post content:", post);
    
    await postToFacebook(post);
    console.log("🏁 Process finished.");
}

main();
