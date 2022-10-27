const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors());

const url = 'https://www.theguardian.com/uk';

// app.METHOD(PATH, HANDLER)

//GET=============================================================

app.get('/results', function (req, res) {
  axios(url)
    .then((response) => {
      const html = response.data;
      const articles = [];

      const $ = cheerio.load(html); // load to parse html , $ means select all html elements
      $('.fc-item__title', html).each(function () {
        const title = $(this).text();
        const url = $(this).find('a').attr('href');
        articles.push({
          title,
          url,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err)); // to log error !
});

//listen----------------------------------------------------------
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// in terminal:
// npm run start   .. 'start' is a script defined in package.json to execute "nodemon index.js"

