const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const authStrategy = new LocalAuth({
    clientId: "client"
})

const client = new Client({
    takeoverOnConflict: true,
    authStrategy,
});
 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', async (msg)=>{
   const groupChat = await msg.getChat()
   if(groupChat.isGroup && groupChat.name === "Mail" && msg.body === "!mail") {
        msg.reply("Getting mails!");
   }
})

client.on('ready', () => {
    console.log('Client is ready!');
});
 

client.initialize();
 
 