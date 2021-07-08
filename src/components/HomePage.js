import React from "react";
import Header from "./common_components/Header";
import TheBlogHeading from "./home_page_components/TheBlogHeading"
import MainBlog from "./home_page_components/MainBlog";
import AllBlogs from "./home_page_components/AllBlogs";
import Footer from "./common_components/Footer";
import LoadMoreButton from "./home_page_components/LoadMoreButton";

import allBlogsData from "../all_blogs";


function HomePage() {
    let mainBlog = allBlogsData[0];
    let otherBlogs = allBlogsData.filter((value, index) => index !== 1);

    return <div>
        <Header />
        <TheBlogHeading />
        <MainBlog imgSrc={mainBlog.img.src} date={mainBlog.data.date} title={mainBlog.data.title} content={mainBlog.data.content} />
        <AllBlogs blogs={otherBlogs} />
        {allBlogsData.length >= 10 ? <LoadMoreButton /> : null}
        <Footer />
    </div>
}

export default HomePage;
