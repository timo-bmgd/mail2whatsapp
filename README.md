# 📧 WhatsApp Email Fetcher

This project provides a simple way to fetch your latest emails and send them to a WhatsApp group.

## How it works

This project uses [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) and [imap](https://github.com/mscdex/node-imap) to connect to your WhatsApp account and email account respectively. When a message is sent to the WhatsApp group named "Mail" with the command `!mail <number of emails>`, this project will fetch the specified number of emails from your inbox and send them back to the WhatsApp group.

## Getting Started

### Prerequisites

- Node.js (>=12.0.0)
- A WhatsApp account
- An email account

### Installation

1. Clone this repository
2. Install dependencies using `npm install`
3. Create a `.env` file in the root directory with the following fields:
   ```
   EMAIL_USERNAME=<your email address>
   EMAIL_PASSWORD=<your email password>
   IMAP_SERVER=<your email provider's IMAP server address>
   IMAP_PORT=<Optional: your email provider's IMAP port>
   ```
4. Run the project using `npm start`

### Usage

1. Open WhatsApp on your phone and scan the QR code displayed in the console
2. In a WhatsApp group named "Mail", type `!mail <number of emails>` to fetch the specified number of emails

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
