import React from "react";
import {Link} from "react-router-dom";

import Header from "./common_components/Header";
import TheBlogHeading from "./home_page_components/TheBlogHeading"
import MainBlog from "./home_page_components/MainBlog";
import AllBlogs from "./home_page_components/AllBlogs";
import Footer from "./common_components/Footer";
import LoadMoreButton from "./home_page_components/LoadMoreButton";

import allBlogsData from "../all_blogs";

var _ = require('lodash');

function HomePage() {
    
    let mainBlog = allBlogsData[0];
    let otherBlogs = allBlogsData.filter((value, index) => index !== 0);

    return <div>
        <Header />
        <TheBlogHeading />
        <Link to={`/read_blog/${_.kebabCase(mainBlog.data.title)}`} style={{textDecoration: "none", color: "black"}}><MainBlog imgSrc={mainBlog.img.src} date={mainBlog.data.date} title={mainBlog.data.title} content={mainBlog.data.content} /></Link>
        <AllBlogs blogs={otherBlogs} />
        {allBlogsData.length >= 10 ? <LoadMoreButton /> : null}
        <Footer />
    </div>
}

export default HomePage;
