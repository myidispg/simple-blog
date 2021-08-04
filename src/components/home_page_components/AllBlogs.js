import React from "react";
import SingleBlog from "./SingleBlog";

import {getSmallDescription, getPlaceHolderImage} from "../../utilities";

function AllBlogs(props) {

    return (<section id="all-blogs" className="side-space">
        <div className="container-fluid">
            <div className="row">
                {props.blogs.map((blog, index) => {
                    return (
                        <SingleBlog key={index} id={blog._id} imgSrc={getPlaceHolderImage(blog)} title={blog.title} content={getSmallDescription(blog)} date={blog.date} />
                    )
                })}
            </div>
        </div>
    </section>);
}

export default AllBlogs;