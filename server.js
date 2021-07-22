// import allBlogsData from "./src/all_blogs";

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = process.env.PORT || 5000;

const allBlogsData = require("./src/all_blogs")

app.listen(port, () => { console.log(`Listening on port ${port}`); });

app.get('/api/blog/all', (req, res) => {
    res.send(allBlogsData.allBlogsData);
});

app.get('/api/express_backend', (req, res) => {
    console.log(`Got a hit. Req: ${req}`);
    res.send({ message: "Welcome to express" });
});
