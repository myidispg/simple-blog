import React from "react";
import { useParams, Redirect } from "react-router-dom";

import Header from "../common_components/Header";
import Footer from "../common_components/Footer";

import allBlogsData from "../../all_blogs";

var _ = require('lodash');

function ReadBlogPage() {

    let blogHeading = useParams().blogHeading;

    var blog = false;

    for(var i=0; i<allBlogsData.length;i++){
        if (blogHeading === _.kebabCase(allBlogsData[i].data.title)) {
            blog = allBlogsData[i];
        }
    }

    if (blog !== false) {
        return <div><Header /><h1>{blog.data.title}</h1><p>{blog.data.date}</p><p>{blog.data.content}</p><Footer /></div>;
    }else{
        return <Redirect to="/" />; // TODO: Redirect to the error page. 
    }
}

export default ReadBlogPage;