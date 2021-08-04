import React from "react";
import { Link } from "react-router-dom";

var _ = require('lodash');

function SingleBlog(props) {
    console.log(props);
    return (<div className="col-lg-4 col-sm-12 col-md-6 single-blog-column left-column">
        <Link to={`/read_blog/${props.id}`} style={{ textDecoration: "none", color: "black", display: "inline-block" }}>
            <img src={props.imgSrc} alt="First Blog" className="single-blog-img" />
            <h6 className="small-blog-date">{props.date}</h6>
            <h2 className="small-blog-heading">{props.title}</h2>
            <p className="small-blog-content">{props.content}</p>
        </Link>
    </div>);
}

export default SingleBlog;
