import React from "react";
import { Link } from "react-router-dom";
import SingleBlog from "./SingleBlog";

var _ = require('lodash');

function AllBlogs(props) {

    return (<section id="all-blogs" className="side-space">
        <div className="container-fluid">
            <div className="row">
                {props.blogs.map((blog, index) => {
                    return (
                        <SingleBlog key={index} imgSrc={blog.img.src} title={blog.data.title} content={blog.data.content} date={blog.data.date} />
                    )
                })}
                {/* <SingleBlog /> */}
            </div>
        </div>
    </section>);
}

export default AllBlogs;