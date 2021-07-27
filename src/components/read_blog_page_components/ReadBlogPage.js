import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import Header from "../common_components/Header";
import Footer from "../common_components/Footer";
import placeholder from "../../react-assets/profile-placeholder.png"
import Loader from "../common_components/Loader";

function ReadBlogPage() {

    let blogHeading = useParams().blogHeading;

    const [blog, setBlog] = useState({
        date: "",
        author: "",
        title: "",
        contentArray: []
    });
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getBlogData(blogHeading).then(data => {
            setBlog(data);
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        }).catch((err) => { console.log(err); });
    }, []);

    async function getBlogData(blogHeading) {
        let response = await fetch(`/api/blog/${blogHeading}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const body = await response.json();
        if (response.status !== 200) {
            setRedirectToHome(true);
        } else {
            return body;
        }
    }

    if (!redirectToHome) {
        return isLoading ? <Loader /> : <div>
            <Header displayName="Write a Blog" link="/write_blog" onClick={() => { }} />
            <h1 className="side-space read-blog-heading">{blog.title}</h1>
            <div className="side-space row read-blog-author-date">
                <div className="mx-auto row">
                    <img src={placeholder} alt="icon of guy working on laptop" className="author-image" />
                    <div className="author-date-column">
                        <p className="author-name">by {blog.author}</p>
                        <p className="author-date">{blog.date}</p>
                    </div>
                </div>
            </div>
            <hr className="side-space read-blog-divider" />
            <div className="read-blog-content-container">
                {blog.contentArray.map((element, index) => {
                    if (typeof element === "string") {
                        return <p key={index} className="side-space read-blog-paragraph">{element}</p>
                    } else {
                        if (element.type === "heading") {
                            return <h2 key={index} className="side-space read-blog-subheading">{element.content}</h2>
                        } else {
                            return <div className="row" key={index} >
                                <div className="mx-auto">
                                    <img className="side-space read-blog-img" src={element.content} alt="blog" />
                                </div>
                            </div>
                        }
                    }
                })}
            </div>
            <Footer />
        </div>;
    } else {
        return <Redirect to="/" />; // TODO: Redirect to the error page. 
    }
}

export default ReadBlogPage;