// import allBlogsData from "./src/all_blogs";

const express = require('express');
const bodyParser = require("body-parser");

const app = express();

var _ = require('lodash');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
// parse application/json
app.use(bodyParser.json())
app.use(express.static("public"));

const port = process.env.PORT || 5000;

const allBlogsData = require("./src/all_blogs")

const blogPageSize = 12;

app.listen(port, () => { console.log(`Listening on port ${port}`); });

app.get("/api/blog/getBlogs/main", (req, res) => {
    // Return only the latest blog which is the first in the index
    res.send({
        mainBlog: allBlogsData.allBlogsData[0]
    });
}
);

app.get("/api/blog/getBlogs/page/:pageNumber", (req, res) => {
    let pageNumber = parseInt(req.params.pageNumber);
    console.log(`User requested page number ${pageNumber}`);
    // For page 1, we need indexes [1, 12]. Page 2, we need indexes [13, 24]. Page 3, we need indexes [25, 36].
    // So, for page 1, end index = 1 * 12 = 12. start index = endIndex - (blogPageSize -1) = 1.
    // So, for page 2, end index = 2 * 12 = 24. start index = endIndex - (blogPageSize -1) = 13.
    let endIndex = pageNumber * blogPageSize;
    let startIndex = endIndex - (blogPageSize - 1);
    let isLastPage = false;

    // Chec if the end index is there in the blog
    if (endIndex + 1 >= allBlogsData.allBlogsData.length){
        endIndex = allBlogsData.allBlogsData.length - 1;
        isLastPage = true;
    }

    console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}`);
    console.log(`Total array length: ${allBlogsData.allBlogsData.length}`);
    let blogsToSend = allBlogsData.allBlogsData.slice(startIndex, endIndex + 1);
    res.send({
        blogs: blogsToSend,
        isLastPage: isLastPage
    });
});

app.get('/api/blog/all', (req, res) => {
    let hasMoreBlogs = allBlogsData.allBlogsData.length > 13;
    res.send({
        hasMoreBlogs: hasMoreBlogs,
        blogsList: allBlogsData.allBlogsData
    });
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

app.post('/api/blog/new', (req, res) => {
    let blog = req.body;
    allBlogsData.allBlogsData.unshift(blog);

    // console.log(blog);
    res.status(201).send({ message: "blog created" });
});

app.get('/api/express_backend', (req, res) => {
    console.log(`Got a hit. Req: ${req}`);
    res.send({ message: "Welcome to express" });
});
