import React from "react";

function MainBlog(props) {

    let date = new Date(props.date);

    return <section id="large-blog" className="side-space">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-sm-12 col-md-12">
                    <img src={props.imgSrc} alt="First Blog" />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12 large-blog-content">
                    <h6 className="large-blog-date">{`${date.toLocaleString('default', { month: "long" })} ${date.getDate()}, ${date.getFullYear()}`}</h6>
                    <h2>{props.title}</h2>
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    </section>;
}

export default MainBlog;