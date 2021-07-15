import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header(props) {

    console.log(props.headerLinks)

    const [isNavOpen, setNavOpen] = useState(false);

    function toggleNav() {
        setNavOpen(prevValue => { return !prevValue });
    }


    return <section id="navbar" style={{ backgroundColor: isNavOpen ? "white" : "transparent" }}>
        <div className="container-fluid navbar-container">
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="logo" to="/">B</Link>
                {/* <a className="logo" href="#">B</a> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarToggleContent"
                    aria-controls="navBarToggleContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navBarToggleContent">
                    <ul className="navbar-nav ml-auto">
                        {
                            props.headerLinks.map((element, index) => {
                                return <li key={index} className="nav-item">
                                    {
                                        element.link[0] === "#" ?
                                            <a className={`nav-link ${element.isActive ? "nav-link-active" : ""}`} href={element.link}>{element.displayName}</a> :
                                            <Link className={`nav-link ${element.isActive ? "nav-link-active" : ""}`} to={element.link}>{element.displayName}</Link>
                                    }

                                </li>
                            })
                        }
                    </ul>
                </div>
            </nav>
        </div>
    </section>;
}

export default Header;