// import allBlogsData from "./src/all_blogs";

const express = require('express');
const app = express();

var _ = require('lodash');

app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = process.env.PORT || 5000;

const allBlogsData = require("./src/all_blogs")

app.listen(port, () => { console.log(`Listening on port ${port}`); });

app.get('/api/blog/all', (req, res) => {
    res.send(allBlogsData.allBlogsData);
});

app.get('/api/blog/:heading', (req, res) => {
    let headingKebab = req.params.heading;
    let blog = undefined;
    for (var i = 0; i < allBlogsData.allBlogsData.length; i++) {
        if (headingKebab === _.kebabCase(allBlogsData.allBlogsData[i].title)) {
            blog = allBlogsData.allBlogsData[i];
            break;
        }
    }
    blog !== undefined ? res.send(blog) : res.sendStatus(404);
});

app.get('/api/express_backend', (req, res) => {
    console.log(`Got a hit. Req: ${req}`);
    res.send({ message: "Welcome to express" });
});
