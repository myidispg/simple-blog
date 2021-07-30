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

    const [allBlogsData, setAllBlogs] = useState([]);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [requiredPageNumber, setRequiredPageNumber] = useState(1);
    const [isFirstPageLoaded, setIsFirstPageLoaded] = useState(false);

    useEffect(() => {
        // This is on first load only. 
        console.log("Use effect on page load only");
        // Get the main blog and upto 12 blogs of page 1.
        getMainBlog().then(mainBlogResult => {
            if (mainBlogResult !== null) {
                setAllBlogs([mainBlogResult.mainBlog]);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);

                // Get the rest of the blogs for page 1.
                getBlogsByPageNumber(requiredPageNumber).then(blogsByPageResult => {
                    if (blogsByPageResult !== null) {
                        console.log(`Got blogs for page number: ${requiredPageNumber}. Blogs received: ${blogsByPageResult.blogs.length}`);
                        // setAllBlogs(allBlogsData.concat(blogsByPageResult.blogs));
                        setAllBlogs(prevValue => {
                            let newArray = prevValue.concat(blogsByPageResult.blogs);
                            console.log(newArray.length);
                            return newArray;
                        });
                        setShowLoadMore(!blogsByPageResult.isLastPage);
                    } else {
                        console.log("There was an error in getting blogs for page 1 on page load");
                    }
                });

            } else {
                // TODO: Show an error page stating there are no blogs to show.
            }
            setIsFirstPageLoaded(true);

        }).catch(error => {
            console.log(error);
        });

    }, []);

    useEffect(() => {
        // Everytime the required page number is changed, then need to get more blogs for that page.
        if (isFirstPageLoaded) {
            getBlogsByPageNumber(requiredPageNumber).then(blogsByPageResult => {
                if (blogsByPageResult !== null) {
                    console.log(`Got blogs for page number: ${requiredPageNumber}. Blogs received: ${blogsByPageResult.blogs.length}`);
                    setAllBlogs(allBlogsData.concat(blogsByPageResult.blogs));
                    setShowLoadMore(!blogsByPageResult.isLastPage);
                } else {
                    console.log(`There was an error in getting blogs for page ${requiredPageNumber} on load more click`);
                }
            });
        }
    }, [requiredPageNumber]);

    async function getMainBlog() {
        let response = await fetch(`/api/blog/getBlogs/main`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        let data = await response.json();
        if (response.status === 200) {
            return data;
        } else {
            console.log("Error in getting main blog");
            return null;
        }
    }

    async function getBlogsByPageNumber(pageNumber) {
        let response = await fetch(`/api/blog/getBlogs/page/${pageNumber}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        let data = await response.json();
        if (response.status === 200) {
            return data;
        } else {
            console.log("Error in getting blogs by page number");
            return null;
        }
    }

    function getMoreBlogs(event) {
        console.log(event.target);
        setRequiredPageNumber(requiredPageNumber + 1);
    }

    let mainBlog = allBlogsData[0];
    let otherBlogs = allBlogsData.filter((value, index) => index !== 0);

    return isLoading ? <Loader /> : <div>
        <Header displayName="Write a Blog" link="/write_blog" onClick={() => { }} />
        <TheBlogHeading />
        <Link to={`/read_blog/${_.kebabCase(mainBlog.title)}`} style={{ textDecoration: "none", color: "black" }}>
            <MainBlog imgSrc={getPlaceHolderImage(mainBlog)} date={mainBlog.date} title={mainBlog.title} content={getSmallDescription(allBlogsData[0])} />
        </Link>
        <AllBlogs blogs={otherBlogs} />
        {showLoadMore ? <LoadMoreButton onClick={getMoreBlogs} /> : null}
        <Footer />
    </div>;
}

export default HomePage;
