const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config(); // <-- Must come BEFORE connectToDb()
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const connectToDb = require('./config/db');
connectToDb();
const indexRouter=require('./routes/home.routes')

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',indexRouter);
app.use('/user', userRouter);

app.listen(3000);
