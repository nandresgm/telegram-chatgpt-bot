const { Telegraf } = require('telegraf');
const OpenAI = require('openai');

// Token de tu bot de Telegram
const bot = new Telegraf('7598123994:AAHGo5-2Osb_4SzlgpbTDpu2VhQFhonM_3I'); // Reemplaza con tu token

// Configura OpenAI
const openai = new OpenAI({
  apiKey: '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', // Reemplaza con tu clave
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