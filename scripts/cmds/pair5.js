const { createCanvas, loadImage } = require('canvas');
const fs = require('fs-extra');
const path = require('path');

// Cache system
const avatarCache = new Map();

async function getAvatar(userID) {
    if (avatarCache.has(userID)) {
        return avatarCache.get(userID);
    }

    try {
        const url = `https://graph.facebook.com/${userID}/picture?width=200&height=200&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        
        if (!response.ok) throw new Error('Failed to fetch avatar');
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const image = await loadImage(buffer);
        
        avatarCache.set(userID, image);
        setTimeout(() => avatarCache.delete(userID), 300000);
        
        return image;
    } catch (e) {
        return getDefaultAvatar();
    }
}

function getDefaultAvatar() {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', 100, 100);
    
    return loadImage(canvas.toBuffer());
}

// Premium Themes with beautiful backgrounds - 46 THEMES TOTAL
const premiumThemes = [
    // Original 6 themes
    {
        name: "ROYAL_LOVE",
        bgGradient: ['#667eea', '#764ba2'],
        heartColor: '#FF6B9D',
        textColor: '#FFFFFF',
        accentColor: '#FFD700'
    },
    {
        name: "SUNSET_ROMANCE", 
        bgGradient: ['#ff9a9e', '#fecfef'],
        heartColor: '#FF4E50',
        textColor: '#FFFFFF',
        accentColor: '#FFD93D'
    },
    {
        name: "OCEAN_WHISPER",
        bgGradient: ['#4facfe', '#00f2fe'],
        heartColor: '#FF9A8B',
        textColor: '#FFFFFF',
        accentColor: '#A8FF78'
    },
    {
        name: "GOLDEN_AURA",
        bgGradient: ['#fad961', '#f76b1c'],
        heartColor: '#FF4E50',
        textColor: '#FFFFFF',
        accentColor: '#FFE53B'
    },
    {
        name: "PURPLE_DREAM",
        bgGradient: ['#6a11cb', '#2575fc'],
        heartColor: '#FF6B9D',
        textColor: '#FFFFFF',
        accentColor: '#FFCC70'
    },
    {
        name: "SPRING_BLOOM",
        bgGradient: ['#ffecd2', '#fcb69f'],
        heartColor: '#FF4E50',
        textColor: '#8B4513',
        accentColor: '#FF6B6B'
    },

    // Water + Purple + Flower Themes (20 themes)
    {
        name: "AQUA_PURPLE_BLOSSOM",
        bgGradient: ['#8A2BE2', '#00CED1'],
        heartColor: '#FF69B4',
        textColor: '#FFFFFF',
        accentColor: '#FFD700'
    },
    {
        name: "VIOLET_OCEAN_FLOWER",
        bgGradient: ['#9400D3', '#1E90FF'],
        heartColor: '#FF1493',
        textColor: '#FFFFFF',
        accentColor: '#00FF7F'
    },
    {
        name: "LAVENDER_WATER_LILY",
        bgGradient: ['#E6E6FA', '#4169E1'],
        heartColor: '#BA55D3',
        textColor: '#2F4F4F',
        accentColor: '#FF4500'
    },
    {
        name: "DEEP_SEA_ORCHID",
        bgGradient: ['#4B0082', '#008B8B'],
        heartColor: '#FF00FF',
        textColor: '#FFFFFF',
        accentColor: '#FFA500'
    },
    {
        name: "CRYSTAL_WATER_VIOLET",
        bgGradient: ['#EE82EE', '#20B2AA'],
        heartColor: '#FF00FF',
        textColor: '#FFFFFF',
        accentColor: '#FFFF00'
    },
    {
        name: "MYSTIC_PURPLE_WAVE",
        bgGradient: ['#DA70D6', '#4682B4'],
        heartColor: '#FF1493',
        textColor: '#FFFFFF',
        accentColor: '#00FFFF'
    },
    {
        name: "ROYAL_WATER_BLOOM",
        bgGradient: ['#9932CC', '#00BFFF'],
        heartColor: '#FF69B4',
        textColor: '#FFFFFF',
        accentColor: '#FFD700'
    },
    {
        name: "TWILIGHT_AQUA_FLOWER",
        bgGradient: ['#8B008B', '#00CED1'],
        heartColor: '#FF00FF',
        textColor: '#FFFFFF',
        accentColor: '#FF8C00'
    },
    {
        name: "MAGIC_PURPLE_RAIN",
        bgGradient: ['#BA55D3', '#87CEEB'],
        heartColor: '#FF1493',
        textColor: '#FFFFFF',
        accentColor: '#32CD32'
    },
    {
        name: "WATERFALL_PURPLE_PETAL",
        bgGradient: ['#9370DB', '#48D1CC'],
        heartColor: '#FF69B4',
        textColor: '#FFFFFF',
        accentColor: '#FF4500'
    },
    {
        name: "OCEAN_MIST_LAVENDER",
        bgGradient: ['#D8BFD8', '#5F9EA0'],
        heartColor: '#DA70D6',
        textColor: '#2F4F4F',
        accentColor: '#FF6347'
    },
    {
        name: "PURPLE_HAZE_WATER",
        bgGradient: ['#800080', '#00BFFF'],
        heartColor: '#FF00FF',
        textColor: '#FFFFFF',
        accentColor: '#FFD700'
    },
    {
        name: "AQUA_VIOLET_DREAM",
        bgGradient: ['#EE82EE', '#40E0D0'],
        heartColor: '#FF69B4',
        textColor: '#FFFFFF',
        accentColor: '#FF8C00'
    },
    {
        name: "DEEP_PURPLE_OCEAN",
        bgGradient: ['#483D8B', '#008080'],
        heartColor: '#FF1493',
        textColor: '#FFFFFF',
        accentColor: '#00FF7F'
    },
    {
        name: "WATER_LILY_PURPLE",
        bgGradient: ['#DDA0DD', '#20B2AA'],
        heartColor: '#BA55D3',
        textColor: '#2F4F4F',
        accentColor: '#FF4500'
    },
    {
        name: "MYSTICAL_WATER_FLOWER",
        bgGradient: ['#8B008B', '#00CED1'],
        heartColor: '#FF00FF',
        textColor: '#FFFFFF',
        accentColor: '#FFFF00'
    },
    {
        name: "PURPLE_RAIN_WATER",
        bgGradient: ['#4B0082', '#87CEEB'],
        heartColor: '#FF69B4',
        textColor: '#FFFFFF',
        accentColor: '#00FFFF'
    },
    {
        name: "AQUA_BLOSSOM_MAGIC",
        bgGradient: ['#DA70D6', '#00BFFF'],
        heartColor: '#FF1493',
        textColor: '#FFFFFF',
        accentColor: '#FFD700'
    },
    {
        name: "VIOLET_WATER_GARDEN",
        bgGradient: ['#9400D3', '#48D1CC'],
        heartColor: '#FF00FF',
        textColor: '#FFFFFF',
        accentColor: '#FF8C00'
    },
    {
        name: "WATER_PURPLE_HARMONY",
        bgGradient: ['#9932CC', '#20B2AA'],
        heartColor: '#FF69B4',
        textColor: '#FFFFFF',
        accentColor: '#32CD32'
    },

    // Sky + White + Rainy Themes (20 themes)
    {
        name: "SKY_WHITE_RAINDROP",
        bgGradient: ['#87CEEB', '#FFFFFF'],
        heartColor: '#4682B4',
        textColor: '#2F4F4F',
        accentColor: '#1E90FF'
    },
    {
        name: "CLOUDY_RAINY_DAY",
        bgGradient: ['#B0C4DE', '#F0F8FF'],
        heartColor: '#6495ED',
        textColor: '#2F4F4F',
        accentColor: '#4169E1'
    },
    {
        name: "STORMY_SKY_WHITE",
        bgGradient: ['#708090', '#F5F5F5'],
        heartColor: '#483D8B',
        textColor: '#FFFFFF',
        accentColor: '#00BFFF'
    },
    {
        name: "RAINBOW_AFTER_RAIN",
        bgGradient: ['#87CEEB', '#E6E6FA'],
        heartColor: '#6A5ACD',
        textColor: '#2F4F4F',
        accentColor: '#FF69B4'
    },
    {
        name: "MISTY_MORNING_SKY",
        bgGradient: ['#ADD8E6', '#F8F8FF'],
        heartColor: '#4682B4',
        textColor: '#2F4F4F',
        accentColor: '#FF6347'
    },
    {
        name: "WHITE_CLOUD_RAIN",
        bgGradient: ['#F0F8FF', '#87CEEB'],
        heartColor: '#4169E1',
        textColor: '#2F4F4F',
        accentColor: '#FF4500'
    },
    {
        name: "SILVER_RAIN_SKY",
        bgGradient: ['#C0C0C0', '#F5F5F5'],
        heartColor: '#696969',
        textColor: '#2F4F4F',
        accentColor: '#1E90FF'
    },
    {
        name: "BLUE_SKY_WHITE_CLOUD",
        bgGradient: ['#B0E0E6', '#FFFFFF'],
        heartColor: '#0000CD',
        textColor: '#2F4F4F',
        accentColor: '#FF69B4'
    },
    {
        name: "RAINY_DAY_REFLECTION",
        bgGradient: ['#778899', '#F0F0F0'],
        heartColor: '#483D8B',
        textColor: '#FFFFFF',
        accentColor: '#00CED1'
    },
    {
        name: "WHITE_RAIN_PATTERN",
        bgGradient: ['#E6E6FA', '#FFFFFF'],
        heartColor: '#6A5ACD',
        textColor: '#2F4F4F',
        accentColor: '#FF1493'
    },
    {
        name: "SKY_BLUE_RAIN_DROP",
        bgGradient: ['#87CEFA', '#F8F8FF'],
        heartColor: '#000080',
        textColor: '#2F4F4F',
        accentColor: '#FFA500'
    },
    {
        name: "WHITE_STORM_CLOUDS",
        bgGradient: ['#D3D3D3', '#FFFFFF'],
        heartColor: '#4682B4',
        textColor: '#2F4F4F',
        accentColor: '#32CD32'
    },
    {
        name: "RAINY_SKY_MIST",
        bgGradient: ['#A9A9A9', '#F5F5F5'],
        heartColor: '#2F4F4F',
        textColor: '#FFFFFF',
        accentColor: '#00BFFF'
    },
    {
        name: "WHITE_RAINBOW_SKY",
        bgGradient: ['#F0FFFF', '#87CEEB'],
        heartColor: '#6495ED',
        textColor: '#2F4F4F',
        accentColor: '#FF69B4'
    },
    {
        name: "CLOUDY_WHITE_RAIN",
        bgGradient: ['#F5F5F5', '#B0C4DE'],
        heartColor: '#4169E1',
        textColor: '#2F4F4F',
        accentColor: '#FF4500'
    },
    {
        name: "SKY_WHITE_SHOWER",
        bgGradient: ['#E0FFFF', '#FFFFFF'],
        heartColor: '#0000CD',
        textColor: '#2F4F4F',
        accentColor: '#FF1493'
    },
    {
        name: "WHITE_RAIN_SILVER",
        bgGradient: ['#F8F8FF', '#C0C0C0'],
        heartColor: '#696969',
        textColor: '#2F4F4F',
        accentColor: '#1E90FF'
    },
    {
        name: "RAINY_BLUE_WHITE",
        bgGradient: ['#ADD8E6', '#F0F8FF'],
        heartColor: '#000080',
        textColor: '#2F4F4F',
        accentColor: '#FF6347'
    },
    {
        name: "WHITE_SKY_DRIZZLE",
        bgGradient: ['#F5F5F5', '#87CEFA'],
        heartColor: '#4682B4',
        textColor: '#2F4F4F',
        accentColor: '#00FF7F'
    },
    {
        name: "SKY_WHITE_STORM",
        bgGradient: ['#B0C4DE', '#FFFFFF'],
        heartColor: '#2F4F4F',
        textColor: '#FFFFFF',
        accentColor: '#FFD700'
    },

    // Additional 4 themes to complete 46 total
    {
        name: "GOLDEN_SUNSET_RAIN",
        bgGradient: ['#FFD700', '#87CEEB'],
        heartColor: '#FF4500',
        textColor: '#2F4F4F',
        accentColor: '#FF1493'
    },
    {
        name: "PURPLE_WHITE_MAGIC",
        bgGradient: ['#8A2BE2', '#FFFFFF'],
        heartColor: '#FF00FF',
        textColor: '#2F4F4F',
        accentColor: '#00CED1'
    },
    {
        name: "AQUA_WHITE_BREEZE",
        bgGradient: ['#00CED1', '#F0F8FF'],
        heartColor: '#FF69B4',
        textColor: '#2F4F4F',
        accentColor: '#FF8C00'
    },
    {
        name: "ROYAL_WHITE_STORM",
        bgGradient: ['#4169E1', '#FFFFFF'],
        heartColor: '#FF1493',
        textColor: '#2F4F4F',
        accentColor: '#FFD700'
    }
];

// Sweet Random Compatibility Messages
const sweetMessages = [
    { range: [90, 100], messages: ["SOULMATES FOREVER! 💖", "PERFECT MATCH! 🌟", "DESTINED TOGETHER! ✨", "TRUE LOVE FOUND! 💕"] },
    { range: [80, 89], messages: ["AMAZING CONNECTION! 💝", "ALMOST PERFECT! 🌈", "INCREDIBLE BOND! 💫", "WONDERFUL TOGETHER! 🌺"] },
    { range: [70, 79], messages: ["GREAT CHEMISTRY! 💘", "STRONG CONNECTION! 🌷", "PROMISING FUTURE! 💓", "BEAUTIFUL MATCH! 🌼"] },
    { range: [60, 69], messages: ["GOOD VIBES! 💗", "NICE COMPATIBILITY! 🌸", "SWEET CONNECTION! 💞", "HAPPY TOGETHER! 💟"] },
    { range: [50, 59], messages: ["NOT BAD AT ALL! 💝", "COULD WORK OUT! 🌻", "INTERESTING MATCH! 💖", "POTENTIAL GROWTH! 💕"] },
    { range: [40, 49], messages: ["FRIENDS FOR NOW! 💛", "GOOD AS FRIENDS! 🌈", "SWEET FRIENDSHIP! 💚", "NICE COMPANIONS! 💙"] },
    { range: [30, 39], messages: ["BETTER AS FRIENDS! 💜", "FRIENDLY VIBES! 🤍", "GOOD FRIENDSHIP! 🧡", "SWEET BOND! 💛"] },
    { range: [20, 29], messages: ["FRIENDS MATERIAL! 💚", "FRIENDLY MATCH! 💙", "GOOD ACQUAINTANCES! 💜", "NICE CONNECTION! 🤎"] },
    { range: [10, 19], messages: ["GETTING TO KNOW! 💝", "NEW BEGINNINGS! 🌱", "FRESH START! 🌟", "INTERESTING MEET! ✨"] },
    { range: [0, 9], messages: ["UNIQUE CONNECTION! 💫", "SPECIAL BOND! 🌈", "DIFFERENT VIBES! 🌸", "INTERESTING PAIR! 🌺"] }
];

function getSweetMessage(percentage) {
    for (const group of sweetMessages) {
        if (percentage >= group.range[0] && percentage <= group.range[1]) {
            return group.messages[Math.floor(Math.random() * group.messages.length)];
        }
    }
    return "SWEET CONNECTION! 💖";
}

function createPremiumBackground(ctx, width, height, theme) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, theme.bgGradient[0]);
    gradient.addColorStop(1, theme.bgGradient[1]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Theme-specific effects
    if (theme.name.includes('WATER') || theme.name.includes('AQUA') || theme.name.includes('OCEAN')) {
        // Water effects
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Wave lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 100 + i * 80);
            ctx.bezierCurveTo(width/3, 80 + i * 80, width*2/3, 120 + i * 80, width, 100 + i * 80);
            ctx.stroke();
        }
        
        // Flower petals for flower themes
        if (theme.name.includes('FLOWER') || theme.name.includes('BLOSSOM') || theme.name.includes('PETAL')) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = Math.random() * 8 + 4;
                drawFlowerPetals(ctx, x, y, size);
            }
        }
    }
    else if (theme.name.includes('RAIN') || theme.name.includes('STORM') || theme.name.includes('CLOUD')) {
        // Rain effects
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const length = Math.random() * 15 + 5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 2, y + length);
            ctx.stroke();
        }
        
        // Cloud shapes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * width;
            const y = Math.random() * 100;
            const size = Math.random() * 40 + 20;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.arc(x + 30, y, size - 10, 0, Math.PI * 2);
            ctx.arc(x - 30, y, size - 10, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    else {
        // Default sparkle effects for other themes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 2 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawFlowerPetals(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    
    for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(size/2, size/2, size, size/3, size, 0);
        ctx.bezierCurveTo(size, -size/3, size/2, -size/2, 0, 0);
        ctx.fill();
    }
    
    ctx.restore();
}

function drawPremiumHeart(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 25;
    
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size/2, y, x - size/2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size/2, y + (size + topCurveHeight)/2, x, y + (size + topCurveHeight)/1.3, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight)/1.3, x + size/2, y + (size + topCurveHeight)/2, x + size/2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size/2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowBlur = 0;
}

module.exports = {
    config: {
        name: "pair5",
        aliases: ["ship5", "love5", "premiumship"],
        version: "4.0",
        author: "Mahi--",
        role: 0,
        shortDescription: { en: "Premium ship card with sweet messages" },
        longDescription: { en: "Generates premium ship cards with beautiful themes and sweet compatibility messages" },
        category: "fun",
        guide: { en: "{pn} [@mention] or {pn} [@user1] [@user2]" }
    },

    onStart: async function ({ api, event, message, usersData }) {
        const startTime = Date.now();
        const processingMessage = await message.reply("💖 Calculating your best match..");

        try {
            let user1ID, user2ID;
            const mentions = Object.keys(event.mentions);

            if (mentions.length === 2) {
                user1ID = mentions[0];
                user2ID = mentions[1];
            } else if (mentions.length === 1) {
                user1ID = event.senderID;
                user2ID = mentions[0];
            } else {
                user1ID = event.senderID;
                const participants = event.participantIDs || [];
                const availableUsers = participants.filter(id => 
                    id !== user1ID && id !== api.getCurrentUserID()
                );
                
                if (availableUsers.length === 0) {
                    await message.unsend(processingMessage.messageID);
                    return message.reply("❌ NO ONE TO PAIR WITH IN THIS GROUP");
                }
                
                user2ID = availableUsers[Math.floor(Math.random() * availableUsers.length)];
            }

            // Get names
            let name1, name2;
            try {
                [name1, name2] = await Promise.all([
                    usersData.getName(user1ID).catch(() => `USER${user1ID.slice(-4)}`),
                    usersData.getName(user2ID).catch(() => `USER${user2ID.slice(-4)}`)
                ]);
            } catch {
                name1 = `USER${user1ID.slice(-4)}`;
                name2 = `USER${user2ID.slice(-4)}`;
            }

            // Load avatars
            const [avatar1, avatar2] = await Promise.race([
                Promise.all([getAvatar(user1ID), getAvatar(user2ID)]),
                new Promise(resolve => setTimeout(() => resolve([getDefaultAvatar(), getDefaultAvatar()]), 3000))
            ]);

            // Calculate compatibility
            const percentage = Math.floor(Math.random() * 101);
            const shipName = (name1.slice(0, Math.ceil(name1.length / 2)) + name2.slice(Math.floor(name2.length / 2))).toUpperCase();

            // Select random premium theme from 46 options
            const theme = premiumThemes[Math.floor(Math.random() * premiumThemes.length)];
            const sweetMessage = getSweetMessage(percentage);

            // Create premium canvas
            const canvas = createCanvas(900, 500);
            const ctx = canvas.getContext('2d');

            // Apply premium background with special effects
            createPremiumBackground(ctx, canvas.width, canvas.height, theme);

            // Avatar settings - INCREASED DISTANCE
            const avatarSize = 140;
            const avatarY = 150;
            const avatar1X = 120;  // Reduced from 180
            const avatar2X = canvas.width - avatarSize - 120;  // Reduced from 180

            // Draw avatar glow effect
            ctx.strokeStyle = theme.accentColor;
            ctx.lineWidth = 4;
            ctx.shadowColor = theme.accentColor;
            ctx.shadowBlur = 20;
            
            ctx.beginPath();
            ctx.arc(avatar1X + avatarSize/2, avatarY + avatarSize/2, avatarSize/2 + 5, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(avatar2X + avatarSize/2, avatarY + avatarSize/2, avatarSize/2 + 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw avatars
            ctx.save();
            ctx.beginPath();
            ctx.arc(avatar1X + avatarSize/2, avatarY + avatarSize/2, avatarSize/2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(avatar1, avatar1X, avatarY, avatarSize, avatarSize);
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.arc(avatar2X + avatarSize/2, avatarY + avatarSize/2, avatarSize/2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(avatar2, avatar2X, avatarY, avatarSize, avatarSize);
            ctx.restore();

            // Draw premium heart
            drawPremiumHeart(ctx, canvas.width/2, 180, 100, theme.heartColor);

            // Percentage with glow
            ctx.fillStyle = theme.textColor;
            ctx.font = 'bold 60px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 10;
            ctx.fillText(`${percentage}%`, canvas.width/2, 190);
            ctx.shadowBlur = 0;

            // Sweet message - MOVED LOWER to avoid overlap
            ctx.font = 'bold 28px Arial';
            ctx.fillStyle = theme.accentColor;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 5;
            ctx.fillText(sweetMessage, canvas.width/2, 280);  // Increased from 250
            ctx.shadowBlur = 0;

            // Names - POSITIONED LOWER
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = theme.textColor;
            const displayName1 = name1.length > 12 ? name1.substring(0, 12).toUpperCase() + '...' : name1.toUpperCase();
            const displayName2 = name2.length > 12 ? name2.substring(0, 12).toUpperCase() + '...' : name2.toUpperCase();
            
            ctx.fillText(displayName1, avatar1X + avatarSize/2, avatarY + avatarSize + 60);  // Increased from 40
            ctx.fillText(displayName2, avatar2X + avatarSize/2, avatarY + avatarSize + 60);  // Increased from 40

            // Ship name - MOVED LOWER
            ctx.font = 'italic bold 32px Arial';
            ctx.fillStyle = theme.accentColor;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 5;
            ctx.fillText(shipName, canvas.width/2, 380);  // Increased from 350
            ctx.shadowBlur = 0;

            // Theme name at bottom
            ctx.font = 'bold 14px Arial';
            ctx.fillStyle = theme.textColor;
            ctx.fillText(`THEME: ${theme.name} • PREMIUM SHIP CARD • MADE WITH LOVE`, canvas.width/2, 480);

            // Save and send
            const outputPath = path.join(__dirname, 'cache', `premium_pair_${Date.now()}.png`);
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(outputPath, buffer);

            await message.reply({
                body: `💖 COMPATIBILITY RESULT 💖\n\n` +
                      `👤 ${name1.toUpperCase()} + 👤 ${name2.toUpperCase()} = 💞 ${shipName}\n` +
                      `📊 ${percentage}% MATCH\n` +
                      `💌 ${sweetMessage}\n` +
                      `🎨 THEME: ${theme.name}`,
                attachment: fs.createReadStream(outputPath)
            });

            fs.unlinkSync(outputPath);
            await message.unsend(processingMessage.messageID);

        } catch (error) {
            console.error("Error:", error);
            await message.unsend(processingMessage.messageID);
            message.reply("❌ ERROR CREATING PREMIUM SHIP CARD");
        }
    }
};
