const express = require ("express");
const mongoose = require ("mongoose");
const logger = require ("morgan");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

//connecting to mongoose database with local host or heroku
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

//routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}!`);
});