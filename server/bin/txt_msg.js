const txtMessenger = require('../src/TextMessenger');


console.log('TextMessenger', txtMessenger);

txtMessenger({
  to: '+33698867624',
  msg: 'test what up?'
})
.then((msg) => console.log('Twilio', msg))
.catch((err) => console.log('Twilio err:', err));