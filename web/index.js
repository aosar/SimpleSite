const { BasicWebPage, RdrBtn, Image } = require('./components.js');

const PageConfig = {
  title: 'Sample Web Page',
  subtitle: 'This is a sample web page',
  body: [
    RdrBtn('Click me', 'http://www.google.com'),
    RdrBtn('Click me 2', 'http://www.google.com'),
    '<br />',
    Image('https://www.w3schools.com/images/w3schools_green.jpg'),
  ]
};

// Start web server
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send(
  BasicWebPage(PageConfig)
));
app.listen(3000, () => console.log('Listening on port 3000...'));