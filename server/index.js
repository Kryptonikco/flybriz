require('dotenv').config();
const express = require('express');
const cors = require('cors');

const websites = {
  Transavia: require('./src/booker/Transavia'),
  AirFrance: require('./src/booker/AirFrance'),
};

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/api/book', async (req, res) => {

  console.log('api/book req.query', req.query);

  const departureCity = req.query.departureCity;
  const arrivalCity = req.query.arrivalCity;
  const departureDate = req.query.departureDate;
  const arrivalDate = req.query.arrivalDate;
  const website = req.query.website;
  
  try {
    const booker = await websites[website]({
      departure: {
        city: departureCity,
        date: departureDate
      },
      arrival: {
        city: arrivalCity,
        date: arrivalDate,
      }
    });
    res.json(booker);
  } catch (e) {
    res.json({
      error: e.toString()
    });
  }
  
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});