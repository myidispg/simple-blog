import React from "react";

function Footer() {
    return <footer id="footer">
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <img src="https://images.unsplash.com/photo-1589254066213-a0c9dc853511?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvYm90fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                            alt="a robot" />
                    </div>
                    <div className="col credits">
                        <span className="created-by">Created By:</span><br />
                        <span className="name">Prashant Goyal</span>
                    </div>
                </div>
            </div>
            <div className="col social-links">
                <h4 className="lets-talk">Let's Talk</h4>
                <div>
                    <a href="https://www.github.com/myidispg" target="_blank" rel="noreferrer" className="social-links">Github</a>
                    <a href="https://www.twitter.com/myidispg" target="_blank" rel="noreferrer" className="social-links">Twitter</a>
                    <a href="https://www.instagram.com/myidispg" target="_blank" rel="noreferrer" className="social-links">Instagram</a>
                </div>
            </div>
        </div>
        <p className="design-credits">Website design inspired by: <a
            href="https://dribbble.com/shots/15238065-Blog-Personal-Website" target="_blank" rel="noreferrer">
            <u>Dwinawan on Dribbble
            </u>
        </a>
        </p>
    </footer>;
}
export default Footer;