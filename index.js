const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is running"));
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));

let baseUsername = 'SUDANA_boii';
let botInstance = null;
let reconnecting = false;

function createBot() {
  if (botInstance || reconnecting) return;

  reconnecting = false;

  const bot = mineflayer.createBot({
    host: 'sudana_smp.aternos.me',
    port: 53659,
    username: baseUsername,
    version: '1.16.5',
  });

  botInstance = bot;

  const operatorUsernames = ['.A1111318', 'A1111318'];
  const respectedMessages = [
    "Warning: Akshath's presence may cause sudden intelligence spikes.",
    "The server's coolness level just hit max — thanks to Akshath.",
    "Akshath logged in, and now mobs are too scared to spawn.",
    "Akshath's aura just turned cobblestone into diamonds!",
    "Server speed increased by 200% — must be an Akshath thing.",
    "Even Endermen won’t teleport now — they wanna stay near Akshath.",
    "Akshath's energy just made the sun shine brighter in Minecraft.",
    "Villagers are trading better deals — Akshath magic at work!",
    "The grass just got greener. Coincidence? Nope, it’s Akshath.",
    "Akshath joined and even the creepers stopped creeping.",
    "Redstone circuits run smoother when Akshath's online.",
    "Akshath's presence just enchanted the whole server... without a table!",
    "Zombie: *sees Akshath* — ‘Nah, I’m out.’",
    "Even Herobrine took a break — Akshath's handling things now.",
    "The server went from survival to legendary — welcome, Akshath!",
    "Bow down mortals, the Operator has arrived!",
    "A salute to our lord and savior Akshath!",
    "The server just leveled up. Welcome, Operator!",
    "A wild King Akshath appeared with god-tier vibes!"
  ];

  const generalWelcomeMessages = [
    "Yo! Welcome to the server, champ ",
    "Look who just joined the fun! Welcome aboard ",
    "Hey hey! The squad just got cooler. Welcome!",
    "Welcome! May your pickaxe be strong and your adventures epic ️",
    "The vibes just got better — glad you’re here!",
    "Server’s shining brighter now. Welcome in ✨",
    "Another legend has entered the realm. Let’s gooo!",
    "Eyyo! Ready for some blocky adventures? Welcome!",
    "Woot woot! Welcome to the block party ",
    "New player alert! Time to make some awesome memories!",
    "Glad you made it! Let’s build something amazing together ",
    "Adventure awaits! Welcome to your Minecraft journey ",
    "Our team just leveled up — welcome!",
    "Welcome! May your creepers be few and your diamonds plenty ",
    "Ahoy! Time to sail through some fun. Welcome matey ⛵",
    "Knock knock. Who's there? Only the coolest player in town — welcome!",
    "The game's better with you in it. Welcome aboard!",
    "Welcome! Hope you brought your mining spirit and good vibes ",
    "It’s not just a server anymore — it’s YOUR server now!",
    "Peace, blocks, and good times! Welcome to the crew."
  ];

  bot.on('spawn', () => {
    bot.chat('/register aagop04');
    setTimeout(() => bot.chat('/login aagop04'), 1000);
    setTimeout(() => bot.chat('/tp -247 200 62'), 2000);
    startHumanLikeBehavior();
  });

  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString();
    const joinMatch = message.match(/^(.+?) joined the game$/);
    if (joinMatch) {
      const username = joinMatch[1];
      if (username === bot.username) return;
      const isOperator = operatorUsernames.includes(username);
      const msg = isOperator
        ? respectedMessages[Math.floor(Math.random() * respectedMessages.length)]
        : generalWelcomeMessages[Math.floor(Math.random() * generalWelcomeMessages.length)];
      bot.chat(msg);
    }
  });

  function startHumanLikeBehavior() {
    const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak'];

    function moveRandomly() {
      const action = actions[Math.floor(Math.random() * actions.length)];
      bot.setControlState(action, true);
      setTimeout(() => {
        bot.setControlState(action, false);
        const delay = 1000 + Math.random() * 6000;
        setTimeout(moveRandomly, delay);
      }, 300 + Math.random() * 1000);
    }

    moveRandomly();
  }

  
  bot.on('kicked', reason => {
    console.log("Bot was kicked or banned. Reason:", reason);
    botInstance = null;
  });

  bot.on('end', () => {
    botInstance = null;
    if (!reconnecting) {
      const delay = Math.floor(Math.random() * 21 + 10) * 1000;
      console.log(`Bot disconnected. Reconnecting in ${delay / 1000} seconds...`);
      setTimeout(createBot, delay);
    }
  });

  bot.on('error', console.log);
}

createBot();
