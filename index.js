const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = 8000;
// cheerio is a package that enables us to select html elements in a web page
// cheerio is simliar to Jquery
// axios package to send http request to rest endpoints and perfom crud operations

const app = express();
const url = 'https://www.theguardian.com/uk';

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
    console.log(articles);
  })
  .catch((err) => console.log(err)); // to log error !

//listen
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// in terminal:
// npm run start   .. 'start' is a script defined in package.json to execute "nodemon index.js"

