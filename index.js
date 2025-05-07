const { Telegraf } = require('telegraf');
const { Configuration, OpenAIApi } = require('openai');

// Token de tu bot de Telegram
const bot = new Telegraf('7598123994:AAHGo5-2Osb_4SzlgpbTDpu2VhQFhonM_3I');  // Sustituye con el token de BotFather

// Configura OpenAI
const configuration = new Configuration({
  apiKey: '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',  // Sustituye con tu clave API de OpenAI
});
const openai = new OpenAIApi(configuration);

// Comando de inicio
bot.start((ctx) => {
  ctx.reply('Hello! I am your English practice bot. Send me a message, and I will respond with ChatGPT!');
});

// Responder a mensajes
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    // Llamada a la API de OpenAI (ChatGPT)
    const response = await openai.createCompletion({
      model: 'text-davinci-003',  // O el modelo que prefieras
      prompt: userMessage,
      max_tokens: 150,  // Limitar la longitud de la respuesta
    });

    // Enviar la respuesta de ChatGPT al usuario
    ctx.reply(response.data.choices[0].text.trim());
  } catch (error) {
    console.error(error);
    ctx.reply('Sorry, there was an error. Please try again later.');
  }
});

// Inicia el bot
bot.launch();
