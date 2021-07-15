import React, { useEffect, useState } from "react";
import { isMobile } from 'react-device-detect';
import Header from "../common_components/Header";
import Footer from "../common_components/Footer";
import placeholder from "../../react-assets/profile-placeholder.png"

function WriteBlogPage() {

    let headerLinks = [
        { displayName: "Publish", link: "/", isActive: true },
        { displayName: "Login/Register", link: "/", isActive: false },
        { displayName: "About Me", link: "#footer", isActive: false }
    ]

    let today = new Date();

    // blogContent will be an array that will store the whole blog in the schema defined in all_blogs.js
    const [blogContent, setBlogContent] = useState({
        date: `${today.toLocaleString('default', { month: "long" })} ${today.getDate()}, ${today.getFullYear()}`,
        author: "Prashant Goyal",
        title: "",
        // contentArray: [""]
        // contentArray: ["Hello", "", "Hello"]
        contentArray: [
            `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
            "",
            `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
            `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`]
    });

    useEffect(() => {
        blogContent.contentArray.map(function (element, index) {
            let domElement = document.getElementsByName(`blog-content-para-${index}`)[0]
            domElement.style.height = ""
            domElement.style.height = domElement.scrollHeight + "px"
        })
    })

    function setHeight(event) {
        // Expand height of a text area based on the input
        let textArea = event.target;
        textArea.style.height = ""
        textArea.style.height = textArea.scrollHeight + "px";
    }


    function handleInput(event) {

        const targetName = event.target.name;
        const targetValue = event.target.value;

        if (targetName === "blog-title") {
            setBlogContent(prevValue => {
                return {
                    ...prevValue,
                    title: targetValue,
                }
            });
        } else if (targetName.includes("blog-content-para")) {
            let indexOfContent = targetName.split("-")[3];

            setBlogContent(prevValue => {
                prevValue.contentArray[indexOfContent] = targetValue
                return {
                    ...prevValue,
                }
            })
        }
    }

    function handleKeyPress(event) {

        if (blogContent.contentArray.length === 1 && blogContent.contentArray[0] === "") {
            // No need to do anything. User has not typed anything.
            if (event.shiftKey || event.key === "Enter") {
                event.preventDefault();
            }
            console.log("Empty blog");
            return;
        } else {
            // Blog has some content. So, just find out in which para was the keys pressed and add a new para after it.
            if (event.shiftKey && event.key === "Enter") {
                event.preventDefault();
                setBlogContent((prevValue) => {
                    let indexOfContent = parseInt(event.target.name.split("-")[3]) + 1;
                    let newContentArray = [...prevValue.contentArray.slice(0, indexOfContent), "", ...prevValue.contentArray.slice(indexOfContent)]

                    return {
                        ...prevValue,
                        contentArray: newContentArray
                    }
                });
                return;
            }

            // If the backspace key is pressed on an empty paragraph and the paragraph is not at the top, remove the paragraph.
            if (event.key === "Backspace") {
                let indexOfContent = parseInt(event.target.name.split("-")[3]);
                if (blogContent.contentArray[indexOfContent] === "") {
                    event.preventDefault();
                    let newArray = blogContent.contentArray;
                    newArray.splice(indexOfContent, 1)
                    setBlogContent({
                        ...blogContent,
                        contentArray: newArray
                    })

                }
                return;
            }
        }
    }

    function addNewPara() {
        setBlogContent({ ...blogContent, contentArray: [...blogContent.contentArray, ""] });
    }

    return <div>
        <Header headerLinks={headerLinks} />
        <div className="container-fluid">
            <form>
                <div className="row">
                    <textarea rows="1" type="text" placeholder="An Awesome Title" id="blog-title" name="blog-title" className="mx-auto expanding-text-area write-blog-heading" onInput={handleInput} spellCheck="false" />
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
                    {
                        blogContent.contentArray.map((element, index) => {
                            return <textarea key={index} value={element} type="text" placeholder="New para here" id="blog-content-para" name={`blog-content-para-${index}`} className="mx-auto expanding-text-area write-blog-paragraph" onInput={handleInput} onKeyDown={handleKeyPress} onLoad={setHeight} />;
                        })
                    }
                </div>
                <div className="container-fluid">
                    <div className="row new-content-row">
                        <div className="mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-plus-square plus-icon-add-para" viewBox="0 0 16 16" onClick={addNewPara}>
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            {
                                isMobile ? null : <span className="input-hint">Shift + ↵ to write in a new paragraph. ↵ for a new line.</span>
                            }

                        </div>
                    </div>
                </div>

            </form>
        </div>
        <Footer />
    </div>
}

export default WriteBlogPage;