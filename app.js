const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
//const logger = require('./middleware/loggerMiddleware');
//const authorizationMiddleware = require('./middleware/authorizationMiddleware');
require("dotenv").config();
const uri = process.env.MongodbURI;



app.use(express.json());
//app.use(authorizationMiddleware);
//app.use(logger);

const usersRouter =  require('./routes/usersRoute');
const newsRouter = require("./routes/newsRoute");
app.use('/users', usersRouter)
app.use("/news", newsRouter);


app.get('/',(req, res) => {
    res.send('Hello World!');
    })

app.use(express.urlencoded({ extended: true }));

console.log(" MongodbURI:", uri);

mongoose.connect(uri)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });





module.exports = app;