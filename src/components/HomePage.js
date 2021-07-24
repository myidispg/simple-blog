import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "./common_components/Header";
import TheBlogHeading from "./home_page_components/TheBlogHeading"
import MainBlog from "./home_page_components/MainBlog";
import AllBlogs from "./home_page_components/AllBlogs";
import Footer from "./common_components/Footer";
import LoadMoreButton from "./home_page_components/LoadMoreButton";

// import allBlogsData from "../all_blogs";
import { getSmallDescription, getPlaceHolderImage } from "../utilities";
import Loader from "./common_components/Loader";

var _ = require('lodash');

function HomePage() {

    let headerLinks = [
        { displayName: "Write A Blog", link: "/write_blog", isActive: true },
        { displayName: "Login/Register", link: "/", isActive: false },
        { displayName: "About Me", link: "#footer", isActive: false }
    ]

    const [allBlogsData, setAllBlogs] = useState(["", ""]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllBlogs().then(data => {
            setAllBlogs(data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }).catch(err => { console.log(err); });
    }, []);

    async function getAllBlogs() {
        let response = await fetch("api/blog/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body);
        } else {
            return body;
        }
    }

    let mainBlog = allBlogsData[0];
    let otherBlogs = allBlogsData.filter((value, index) => index !== 0);

    return isLoading ? <Loader /> : <div>
        <Header headerLinks={headerLinks} />
        <TheBlogHeading />
        <Link to={`/read_blog/${_.kebabCase(mainBlog.title)}`} style={{ textDecoration: "none", color: "black" }}>
            <MainBlog imgSrc={getPlaceHolderImage(mainBlog)} date={mainBlog.date} title={mainBlog.title} content={getSmallDescription(allBlogsData[0])} />
        </Link>
        <AllBlogs blogs={otherBlogs} />
        {allBlogsData.length >= 10 ? <LoadMoreButton /> : null}
        <Footer />
    </div>;
}

export default HomePage;
