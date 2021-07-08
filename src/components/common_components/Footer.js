import React from "react";

function Footer() {
    return <section id="footer">
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
                    <p className="social-links">Github</p>
                    <p className="social-links">Twitter</p>
                    <p className="social-links">Instagram</p>
                </div>
            </div>
        </div>
        <p className="design-credits">Website design inspired by: <a
            href="https://dribbble.com/shots/15238065-Blog-Personal-Website" target="_blank"><u>Dwinawan on
                Dribbble</u></a></p>
    </section>;
}
export default Footer;