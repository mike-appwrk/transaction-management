import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE);
const db = mongoose.connection;

db.on('error', (error) => {
  console.log("----Mongo is Erred-----", error.message)
});

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.send('Hey Client!')
});

//server
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log('Server Running at PORT: ', server.address().port);
});

