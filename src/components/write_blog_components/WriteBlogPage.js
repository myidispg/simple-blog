import React, { useState } from "react";
import Header from "../common_components/Header";
import Footer from "../common_components/Footer";
import placeholder from "../../react-assets/profile-placeholder.png"

function expandHeight(event) {
    // Expand height of a text area based on the input
    let textArea = event.target;
    textArea.style.height = ""
    textArea.style.height = textArea.scrollHeight + "px";
}

function WriteBlogPage() {

    let today = new Date();

    return <div>
        <Header />
        <form>
            <div className="row">
                <textarea rows="1" type="text" placeholder="Give your blog an awesome title" id="blog-title" name="blog-title" className="mx-auto write-blog-heading" onInput={expandHeight} spellCheck="false" />
            </div>
            {/* The Author date and horizontal rule */}
            <div className="side-space row blog-page-author-date">
                <div className="mx-auto row">
                    <img src={placeholder} alt="icon of guy working on laptop" className="author-image" />
                    <div className="author-date-column">
                        <p className="author-name">by Prashant Goyal</p>
                        <p className="author-date">Published on: {`${today.toLocaleString('default', { month: "long" })} ${today.getDate()}, ${today.getFullYear()}`}</p>
                    </div>
                </div>
            </div>
            <hr className="side-space read-blog-divider" />
            {/* The blog content */}
            <div className="row">
                <input type="text" placeholder="Start writing here" id="blog-content-para" name="blog-content-para" className="mx-auto write-blog-paragraph" />
            </div>
        </form>
        <Footer />
    </div>
}

export default WriteBlogPage;