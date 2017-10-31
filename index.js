const express = require('express'); //Common JS module
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'buddy' });
}); //route handler
const PORT = process.env.PORT || 5000; //environment variables
app.listen(PORT); //5000 = port number

//Deployment checklist -- 4 parts
