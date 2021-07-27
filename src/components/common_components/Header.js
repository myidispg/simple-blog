import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header(props) {

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
                            props.link[0] === "#" ?
                            <a className={`nav-link nav-link-active`} href={props.link} onClick={props.onClick}>{props.displayName}</a> :
                            <Link className={`nav-link nav-link-active`} to={props.link} onClick={props.onClick}>{props.displayName}</Link>
                            
                        }
                    </ul>
                </div>
            </nav>
        </div>
    </section>;
}

export default Header;