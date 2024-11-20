const express = require('express')
const app = express()
const {connectDB} = require('./connections/database');
const cookieparser = require('cookie-parser')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())
const userRouter = require('./routes/user');
const homeRouter = require('./routes/file');


app.use('/', homeRouter)
app.use('/user', userRouter)


connectDB()
  .then(() => {
    console.log("Success");
    app.listen(6600, () => {
      console.log("RUNNING");
    });
  })
  .catch((err) => {
    console.log(err);
  });