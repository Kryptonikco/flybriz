const Mailer = require('../src/Mailer.js');

Mailer({
  msg: `Message envoyé ${(new Date()).toString()}`,
  to: 'me@jenaiccambre.com'
});