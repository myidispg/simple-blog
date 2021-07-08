import React from "react";

function SingleBlog(props) {
    return (<div className="col-lg-4 col-sm-12 col-md-6 single-blog-column left-column">
        <img src={props.imgSrc} alt="First Blog" className="single-blog-img" />
        <h6 className="small-blog-date">{props.date}</h6>
        <h2 className="small-blog-heading">{props.title}</h2>
        <p className="small-blog-content">{props.content}</p>
    </div>);
}

export default SingleBlog;