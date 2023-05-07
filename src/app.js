const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");
const fetchEmails = require("./mail");

const authStrategy = new LocalAuth({
    clientId: "client",
});

const client = new Client({
    takeoverOnConflict: true,
    authStrategy,
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("message_create", async (msg) => {
    const groupChat = await msg.getChat();
    let command = msg.body.split(" ");
    let argument = command[1] || 1;
    if (groupChat.isGroup && groupChat.name === "Mail") {
        if (command[0] == "!mail") {
            if (isNaN(argument))
                return client.sendMessage(msg.from, "Invalid number of emails!");
            let fetchedEmails = await fetchEmails(argument).catch(err => console.log(err));
            msg.reply(`Fetching last ${fetchedEmails.length} emails!`);
            fetchedEmails.forEach((mail) => {
                client.sendMessage(msg.from, mail);
            });
        }
    }
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.initialize();
