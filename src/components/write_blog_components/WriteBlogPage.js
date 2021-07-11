import React, { useState } from "react";
import Header from "../common_components/Header";
import Footer from "../common_components/Footer";
import placeholder from "../../react-assets/profile-placeholder.png"

function WriteBlogPage() {

    let today = new Date();

    // blogContent will be an array that will store the whole blog in the schema defined in all_blogs.js
    const [blogContent, setBlogContent] = useState({
        date: `${today.toLocaleString('default', { month: "long" })} ${today.getDate()}, ${today.getFullYear()}`,
        author: "Prashant Goyal",
        title: "",
        contentArray: []
    });

    function handleInput(event) {
        // Expand height of a text area based on the input
        let textArea = event.target;
        textArea.style.height = ""
        textArea.style.height = textArea.scrollHeight + "px";

        const targetName = event.target.name;
        const targetValue = event.target.value;

        console.log(targetValue);

        if (targetName === "blog-title") {
            setBlogContent(prevValue => {
                return {
                    ...prevValue,
                    title: targetValue,
                }
            });
        }       
    }

    return <div>
        <Header />
        <div className="container-fluid">
            <form>
                <div className="row">
                    <textarea rows="1" type="text" placeholder="The Awesome Title" id="blog-title" name="blog-title" className="mx-auto expanding-text-area write-blog-heading" onInput={handleInput} spellCheck="false" />
                </div>
                {/* The Author date and horizontal rule */}
                <div className="row blog-page-author-date">
                    <div className="mx-auto row">
                        <img src={placeholder} alt="icon of guy working on laptop" className="author-image" />
                        <div className="author-date-column">
                            <p className="author-name">by {blogContent.author}</p>
                            <p className="author-date">Published on: {blogContent.date}</p>
                        </div>
                    </div>
                </div>
                <hr className="side-space read-blog-divider" />
                {/* The blog content */}
                <div className="row">
                    <textarea rows="1" type="text" placeholder="Start writing here" id="blog-content-para" name="blog-content-para" className="mx-auto expanding-text-area write-blog-paragraph" onInput={handleInput} />
                </div>
            </form>
        </div>
        <Footer />
    </div>
}

export default WriteBlogPage;