const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});




const headers = {
  'Authorization': 'Basic NWU2ZGFhZjlkODA4NDgyOGFkYTBlMDBmMThhYTM3Nzg6ZGFmNjBjYjllNTU1NDFhZGI4ZTFhOTM5M2U2YjZkYTM='
};

const dataString = 'grant_type=client_credentials';

const options = {
  url: 'https://accounts.spotify.com/api/token',
  method: 'POST',
  headers: headers,
  body: dataString
};


app.get('/api/token', (req, res) => {

  try {
    request(options, (err, response, body) => {
      if (!err && res.statusCode === 200) {
        console.log(body);
        res.send(body);
      }
    });

  } catch (error) {
    console.log("ERRROR");
    console.log(error);
  }

});


app.post('api/spottoken', async (req, res) => {

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: "Basic BQCrKHD3xJCUHGok7Z56Woo-Eho5DcmwwyPr2RsBMLeVcny1IP1wjhp2lZ85WNfvnQeqq0SRA4gY0_EIT3k=",
        "Content-Type": "application/x-www-form-url-encoded",
        "Accept": "application/json"
      }
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));