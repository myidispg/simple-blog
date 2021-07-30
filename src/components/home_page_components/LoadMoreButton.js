import React from "react";

function LoadMoreButton(props) {
    return (<section id="load-more">
        <div className="container-fluid">
            <div className="row mx-auto">
                <button id="load-more-button" onClick={props.onClick}>Load More</button>
            </div>
        </div>
    </section>);
}

export default LoadMoreButton;