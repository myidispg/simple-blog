import React, { useState } from "react";

// var isNavOpen = false;

// function toggleNav() {
//     // Set to nav is open mode
//     isNavOpen = !isNavOpen;

//     if (isNavOpen) {
//         document.getElementById("navbar").style.backgroundColor = "white";
//     } else {
//         document.getElementById("navbar").style.backgroundColor = "transparent";
//     }
// }

function Header() {
    const [isNavOpen, setNavOpen] = useState(false);

    function toggleNav() {
        setNavOpen(prevValue => { return !prevValue });
    }


    return <section id="navbar" style={{ backgroundColor: isNavOpen ? "white" : "transparent" }}>
        <div className="container-fluid navbar-container">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="logo" href="#">B</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarToggleContent"
                    aria-controls="navBarToggleContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navBarToggleContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link-active nav-link" href="#">Write a Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Login/Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#footer">About Me</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </section>;
}

export default Header;