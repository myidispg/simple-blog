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
        contentArray: [""],
        // contentArray: ["Hello", "", "Hello"],
        // contentArray: [
        //     `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        //     `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

        //     The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        //     {
        //         type: "heading",
        //         content: "This heading precedes the image."
        //     },
        //     "",
        //     `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
        //     `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`
        // ]
    });

    useEffect(() => {

        setHeight(document.getElementById("blog-title"));

        blogContent.contentArray.forEach(function (element, index) {
            let domElement = undefined;
            if (typeof element === "string") {
                domElement = document.getElementsByName(`blog-content-para-${index}`)[0]
                setHeight(domElement);
            } else if (element.constructor === Object && element.type === "heading") {
                domElement = document.getElementsByName(`blog-content-heading-${index}`)[0]
                setHeight(domElement);
            }
        })
    })


    function setHeight(domElement) {
        // Expand height of a text area based on the input
        domElement.style.height = ""
        domElement.style.height = domElement.scrollHeight + "px";
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
        } else if (targetName.includes("blog-content-heading")) {
            let indexOfContent = targetName.split("-")[3];
            setBlogContent(prevValue => {
                prevValue.contentArray[indexOfContent].content = targetValue;
                return {
                    ...prevValue,
                }
            })
        }
    }

    function handleKeyPress(event) {

        if (blogContent.contentArray.length === 1 && blogContent.contentArray[0] === "") {
            // No need to do anything. User has not typed anything.
            if (event.shiftKey && event.key === "Enter") {
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
                // Make sure that paragraphs and subheading is empty before removing that textarea.
                if (blogContent.contentArray[indexOfContent] === "" || blogContent.contentArray[indexOfContent].content === "") {
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

        if (blogContent.contentArray.length === 1 && blogContent.contentArray[0] === "") {
            return;
        } else {
            setBlogContent({ ...blogContent, contentArray: [...blogContent.contentArray, ""] });
        }
    }

    function addHeading(event) {
        let indexOfContent = parseInt(event.target.getAttribute('name').split("-")[3]);
        setBlogContent((prevValue) => {
            let newArray = [...prevValue.contentArray.slice(0, indexOfContent), { type: "heading", content: "" }, ...prevValue.contentArray.slice(indexOfContent + 1)]
            return {
                ...prevValue,
                contentArray: newArray
            }
        })
    }

    function uploadImageButtonClick(event) {
        let indexOfContent = parseInt(event.target.getAttribute("name").split("-")[3]);
        let imageUploadHiddenButton = document.getElementsByName(`add-image-hidden-para-${indexOfContent}`)[0];
        imageUploadHiddenButton.click();

    }

    function imageUploadChangeEventHandler(event) {
        // console.log(event.target);
        // console.log(`event data files: ${event.target.files[0]}`);
        var reader = new FileReader();
        reader.onload = function () {
            let indexOfContent = parseInt(event.target.getAttribute("name").split('-')[4]);
            setBlogContent(prevValue => {
                let newArray = prevValue.contentArray;
                newArray[indexOfContent] = {
                    type: "image",
                    content: reader.result
                };
                return {
                    ...prevValue,
                    contentArray: newArray
                }
            });

        }
        reader.readAsDataURL(event.target.files[0]);
    }

    function removeImage(event) {
        console.log(blogContent.contentArray);

        let indexOfContent = parseInt(event.target.getAttribute("name").split("-")[3]);
        setBlogContent((prevValue) => {
            let newArray = [...prevValue.contentArray.slice(0, indexOfContent), ...prevValue.contentArray.slice(indexOfContent + 1)]
            console.log(newArray);
            return {
                ...prevValue,
                contentArray: newArray
            }
        })

    }

    function showTitleImageButtons(event) {
        // console.log(event.target.name);
        let indexOfContent = parseInt(event.target.name.split("-")[3]);

        // Show the title and image buttons only when the textarea is empty
        if (typeof blogContent.contentArray[indexOfContent] === 'string') {
            if (blogContent.contentArray[indexOfContent].content === "") {

                let addTitleButtonDom = document.getElementsByName(`add-title-para-${indexOfContent}`);
                let addImageButtonDom = document.getElementsByName(`add-image-para-${indexOfContent}`);

                // console.log(indexOfContent);
                // console.log(addTitleButtonDom);
                // console.log(addImageButtonDom);

                // This returns a nodelist and the first element is the HTML Dom element
                addTitleButtonDom[0].style.visibility = "visible"
                addImageButtonDom[0].style.visibility = "visible"
            }
        }
    }

    function hideTitleImageButtons(event) {
        let indexOfContent = parseInt(event.target.name.split("-")[3]);
        if (blogContent.contentArray[indexOfContent] !== "") {
            let addTitleButtonDom = document.getElementsByName(`add-title-para-${indexOfContent}`);
            let addImageButtonDom = document.getElementsByName(`add-image-para-${indexOfContent}`);
            // This returns a nodelist and the first element is the HTML Dom element
            addTitleButtonDom[0].style.visibility = "hidden"
            addImageButtonDom[0].style.visibility = "hidden"
        }
    }

    return <div>
        <Header headerLinks={headerLinks} />
        {/* <p>{apiMessage}</p> */}
        <div className="container-fluid">
            <form>
                <div className="row">
                    <textarea rows="1" type="text" value={blogContent.title} placeholder="An Awesome Title" id="blog-title" name="blog-title" className="mx-auto expanding-text-area write-blog-heading" onInput={handleInput} spellCheck="false" />
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
                <div className="row mx-auto" style={{ width: "80%" }}>
                    {
                        blogContent.contentArray.map((element, index) => {
                            let showButtons = false;
                            let htmlElement = undefined;
                            if (typeof element === "string") {
                                if (element === "") {
                                    showButtons = true
                                }
                                htmlElement = <div key={index} className="col-12">
                                    <div style={{ display: "inline-block" }} className="add-heading-image-icons-container">
                                        <svg style={{ display: "block", visibility: showButtons ? "visible" : "hidden" }} onClick={addHeading} xmlns="http://www.w3.org/2000/svg" className="bi bi-fonts add-content-icon" name={`add-title-para-${index}`} viewBox="0 0 16 16">
                                            <path name={`add-title-para-${index}`} d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                        </svg>
                                        {/* This div will be hidden. When the user clicks the image svg, programmatically, click this image input  */}
                                        <div style={{ height: "0px", overflow: "hidden" }}>
                                            <input onChange={imageUploadChangeEventHandler} style={{ width: "0px" }} type={"file"} name={`add-image-hidden-para-${index}`} accept="image/*" />
                                        </div>
                                        <svg style={{ visibility: showButtons ? "visible" : "hidden" }} onClick={uploadImageButtonClick} xmlns="http://www.w3.org/2000/svg" className="bi bi-image-fill add-content-icon" name={`add-image-para-${index}`} viewBox="0 0 16 16">
                                            <path name={`add-image-para-${index}`} d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                                        </svg>
                                    </div>
                                    <textarea rows="1" value={element} type="text" placeholder="New para here" id="blog-content-para" name={`blog-content-para-${index}`} className="mx-auto expanding-text-area write-blog-paragraph" onInput={handleInput} onKeyDown={handleKeyPress} onFocus={showTitleImageButtons} onBlur={hideTitleImageButtons} />
                                </div>
                            }
                            if (element.constructor === Object) {
                                // Do not show buttons to convert to image/heading.
                                if (element.content === "") {
                                    showButtons = false;
                                }

                                if (element.type === "heading") {
                                    htmlElement = <div key={index} className="col-12">
                                        <div style={{ display: "inline-block" }} className="add-heading-image-icons-container">
                                            <svg style={{ display: "block", visibility: showButtons ? "visible" : "hidden" }} onClick={addHeading} xmlns="http://www.w3.org/2000/svg" className="bi bi-fonts add-content-icon" name={`add-title-para-${index}`} viewBox="0 0 16 16">
                                                <path name={`add-title-para-${index}`} d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                            </svg>
                                            {/* This div will be hidden. When the user clicks the image svg, programmatically, click this image input  */}
                                            <div style={{ height: "0px", overflow: "hidden" }}>
                                                <input onChange={imageUploadChangeEventHandler} style={{ width: "0px" }} type={"file"} name={`add-image-hidden-para-${index}`} accept="image/*" />
                                            </div>
                                            <svg style={{ visibility: showButtons ? "visible" : "hidden" }} onClick={uploadImageButtonClick} xmlns="http://www.w3.org/2000/svg" className="bi bi-image-fill add-content-icon" name={`add-image-para-${index}`} viewBox="0 0 16 16">
                                                <path name={`add-image-para-${index}`} d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                                            </svg>
                                        </div>
                                        <textarea rows="1" value={element.content} type="text" placeholder="Type a subheading" id="blog-content-para" name={`blog-content-heading-${index}`} className="mx-auto expanding-text-area write-blog-subheading" onInput={handleInput} onKeyDown={handleKeyPress} onFocus={showTitleImageButtons} onBlur={hideTitleImageButtons} />
                                    </div>
                                } else if (element.type === "image") {
                                    htmlElement = <div key={index} className="row mx-auto">
                                        <img key={index} className="read-blog-img" src={element.content} alt="blog" />
                                        <svg name={`remove-image-icon-${index}`} onClick={removeImage} className="bi bi-x-circle remove-image-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                            <path name={`remove-image-icon-${index}`} d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path name={`remove-image-icon-${index}`} d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </div>
                                }
                            }
                            return htmlElement;
                        })
                    }
                </div>
                <div className="container-fluid">
                    <div className="row new-content-row">
                        <div className="mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-plus-square add-content-icon" viewBox="0 0 16 16" onClick={addNewPara}>
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