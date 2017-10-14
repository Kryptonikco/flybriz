require('dotenv').config();
const Twilio = require('twilio');

module.exports = ({
  msg,
  to,
}) => {
  const accountSid = process.env.TWILIO_ACCOUNT;
  const authToken = process.env.TWILIO_SECRET;
  const from = process.env.PHONE_NUMBER;

  const body = msg;
  // require the Twilio module and create a REST client
  const client = Twilio(accountSid, authToken);
  
  return client.messages
  .create({
    to,
    from,
    body,
  });
};