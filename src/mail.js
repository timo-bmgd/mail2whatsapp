var Imap = require("imap"),
  inspect = require("util").inspect;
var htmlToText = require("html-to-text");

var imap = new Imap({
  user: process.env.EMAIL_USERNAME,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.IMAP_SERVER,
  port: process.env.IMAP_PORT || 993,
  tls: true,
});

function openInbox(cb) {
  imap.openBox("INBOX", true, cb);
}

function fetchEmails(emailCount) {
  return new Promise(function(resolve, reject) {
  let allMsgs = [];
  imap.once("ready", function () {
    openInbox(function (err, box) {
      if (err) throw err;
      let requestedNumber = Math.min(box.messages.total - 1,(emailCount - 1));
      var f = imap.seq.fetch(
        box.messages.total -  requestedNumber + ":" + box.messages.total,

        { bodies: ["HEADER.FIELDS (FROM)", "1"], struct: true });
        
      f.on("message", function (msg, seqno) {
        let result = "";
        //console.log("Message #%d", seqno);
        var prefix = "(#" + seqno + ") ";
        msg.on("body", function (stream, info) {
          var buffer = "", count = 0;
          stream.on("data", function (chunk) {
            count += chunk.length;
            buffer += chunk.toString("utf8");
          });
          stream.once("end", function () {
            let textBody = buffer;

            result += htmlToText.convert(textBody, {}) + "\n";

            if (info.which !== "TEXT")
              Imap.parseHeader(buffer);
          });
        });
        msg.once("attributes", function (attrs) {
          //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        msg.once("end", function () {
          allMsgs.push(result);
        });
      });
      f.once("error", function (err) {
        console.log("Fetch error: " + err);
      });
      f.once("end", function () {
        console.log("Done fetching all messages!");
        imap.end();
        resolve(allMsgs);
      });
    });
  });

  imap.once("error", function (err) {
    console.log(err);
    reject();
  });

  imap.once("end", function () {
    console.log("Connection ended");
  });

  imap.connect();
})}

module.exports = fetchEmails;
