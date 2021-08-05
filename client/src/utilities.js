function getSmallDescription(blog) {
    // This will look for the blog's content and form a small description string.
    let description = "";
    blog.contentArray.forEach(element => {
        if(typeof element === "string") {
            description += element;
        }
    });

    return description
}

function getPlaceHolderImage(blog) {
    //  If a blog has an image, then return that image, else a random placeholder.

    let img = '';

    for(var i = 0; i<blog.contentArray.length; i++){
        if(typeof blog.contentArray[i] !== "string"){
            if(blog.contentArray[i].type === "image"){
                img = blog.contentArray[i].content;
                return img;
            }
        }
    }

    // There is no image in the blog. Just add a placeholder.
    let placeholderIndex = Math.floor(Math.random() * 7 + 1);
    return `./assets/placeholder_${placeholderIndex}.jpg`
}

export {getSmallDescription, getPlaceHolderImage};