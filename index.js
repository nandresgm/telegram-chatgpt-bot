const { Telegraf } = require('telegraf');
const OpenAI = require('openai');

// Token de tu bot de Telegram
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN); // Reemplaza con tu token

// Configura OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Reemplaza con tu clave
});

// Comando de inicio
bot.start((ctx) => {
  ctx.reply('Hello! I am your English practice bot. Send me a message, and I will respond with ChatGPT!');
});

// Responder a mensajes
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Puedes usar gpt-4 si tienes acceso
      messages: [{ role: 'user', content: userMessage }],
    });

    ctx.reply(response.choices[0].message.content.trim());
  } catch (error) {
    console.error(error);
    ctx.reply('Sorry, there was an error. Please try again later.');
  }
});

// Inicia el bot
bot.launch();