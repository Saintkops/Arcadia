const https = require("https");
const fs = require('fs');
const app = require("./app");
const path = require('path')
require("dotenv").config();

const PORT = process.env.PORT;

//web site pages routes
const accueilRouter = require('./src/routes/home/accueil.routes');
const serviceRouter = require('./src/routes/services/services.routes');
const habitatRouter = require('./src/routes/habitats/habitats.routes');
const contactRouter = require('./src/routes/contact/contact.routes');

//Api routes
const foodAPIRouter = require('./src/api/v1/food/foodAPI.routes');
const serviceAPIRouter = require('./src/api/v1/services/serviceAPI.routes');
const habitatAPIRouter = require('./src/api/v1/habitat/habitatAPI.routes');


//define website principales routes
app.use('/accueil', accueilRouter);
app.use('/services', serviceRouter);
app.use('/habitats', habitatRouter);
app.use('/contact', contactRouter);

//Arcadia API
app.use('/api/v1/services', serviceAPIRouter);
app.use('/api/v1/foods', foodAPIRouter);
app.use('/api/v1/habitats', habitatAPIRouter);


//https options
const options = {
  key: fs.readFileSync(path.join(__dirname, "./certificates/localhost+2-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./certificates/localhost+2.pem")),
};

const server = https.createServer(options,app);
server.listen(PORT, async () => {
  console.log(`You are listening to port ${PORT}`);
});
