// import allBlogsData from "./src/all_blogs";

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(morgan("tiny"));


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
// parse application/json
app.use(bodyParser.json())
app.use(express.static("public"));

// ------MONGO DB Stuff --------------
// const localUri = "mongodb://localhost:27017/blogDB";
const databaseUri = "mongodb+srv://admin:12pass1234@cluster0.t4cyx.mongodb.net/blogDB?retryWrites=true&w=majority"
mongoose.connect(databaseUri, { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    author: { type: String, default: "Creative Monkey" },
    title: {
        type: String,
        required: true
    },
    contentArray: [mongoose.Mixed]
});

const Blog = mongoose.model("blog", postSchema);

// -------MONOGO DB Stuff OVER -------------

const blogPageSize = 6;

app.get("/api/blog/getBlogs/main", (req, res) => {
    // Return only the latest blog based on time of publication.
    Blog.find({}, {}, { sort: { date: 'desc' }, limit: 1 }, function (err, blogs) {
        // It will return an array of blogs with just one blog in it.
        if (err) {
            console.log(err);
            res.send({
                mainBlog: undefined
            });
        }

        res.send({
            mainBlog: blogs[0]
        });
    });
}
);

app.get("/api/blog/getBlogs/page/:pageNumber", (req, res) => {
    let pageNumber = parseInt(req.params.pageNumber);
    console.log(`\nUser requested page number ${pageNumber}`);

    // For page 1, we need indexes [1, 12]. Page 2, we need indexes [13, 24]. Page 3, we need indexes [25, 36].
    // So, for page 1, end index = 1 * 12 = 12. start index = endIndex - (blogPageSize -1) = 1.
    // So, for page 2, end index = 2 * 12 = 24. start index = endIndex - (blogPageSize -1) = 13.
    let endIndex = pageNumber * blogPageSize;
    let startIndex = endIndex - (blogPageSize - 1);
    let isLastPage = false;
    let totalBlogsCount = 0;

    Blog.countDocuments(function (err, count) {
        console.log(`There are a total of ${count} blogs`);
        totalBlogsCount = count;
    }).then(() => {
        // Check if the end index is there in the blog
        if (endIndex + 1 >= totalBlogsCount) {
            endIndex = totalBlogsCount - 1;
            isLastPage = true;
        }

        console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}`);

        // We have the start and end index. Just need to get the required blogs from database.
        Blog.find({}, {}, { sort: { date: 'desc' } }, function (err, blogs) {
            if (err) {
                console.log(err);
                res.send({
                    blogs: undefined
                });
            }
            let blogsToSend = blogs.slice(startIndex, endIndex + 1);
            res.send({
                blogs: blogsToSend,
                isLastPage: isLastPage
            });
        });
    });

});

app.get('/api/blog/:id', (req, res) => {
    let blogId = req.params.id;

    if (blogId === "undefined") {
        res.sendStatus(404);
    } else {
        console.log(`Client needs to read a blog with ID: ${blogId}`);
        Blog.findById(blogId, function (err, blog) {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else {
                res.send({
                    blog: blog
                });
            }
        });
    }
});


app.post('/api/blog/new', (req, res) => {
    let blog = req.body;
    console.log(blog.date);

    const newBlog = new Blog({
        date: blog.date,
        author: blog.author,
        title: blog.title,
        contentArray: blog.contentArray
    });

    newBlog.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "There was an issue with blog creation", err: err });
        } else {
            res.status(201).send({ message: "blog created" });
        }
    });
});

app.get('/api/express_backend', (req, res) => {
    console.log(`Got a hit. Req: ${req}`);
    res.send({ message: "Welcome to express" });
});

if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    app.use(express.static(path.join(__dirname, "build")));
  
    // Express will serve up the front-end index.html file if it doesn't recognize the route
    app.get("*", (req, res) =>
      res.sendFile(path.join(__dirname, "build", "index.html"))
    );
  }

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
