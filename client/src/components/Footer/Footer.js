import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";


const facebook = <FontAwesomeIcon icon={faFacebook} size="3x"/>;
const twitter = <FontAwesomeIcon icon={faTwitter} size="3x"/>;
const stackOverflow = <FontAwesomeIcon icon={faStackOverflow} size="3x"/>;
const linkedIn = <FontAwesomeIcon icon={faLinkedin} size="3x"/>;
const github = <FontAwesomeIcon icon={faGithub} size="3x"/>;

export default function Footer() {
    return (
        <div className="text-center text-white footer-color fixed-bottom">
    <div className="container p-3">
        <div className="m-2 d-flex justify-content-evenly">
            <a className="btn btn-outline-light btn-floating m-1" href="https://www.stackoverflow.com/" title="Talk about us on Stack Overflow!" target="_blank"  rel="noreferrer" role="button">{stackOverflow}</a>

            <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/" title="Talk about us on Facebook!" target="_blank"  rel="noreferrer" role="button">{facebook}</a>

            <a className="btn btn-outline-light btn-floating m-1" href="https://twitter.com/?lang=en" title="Talk about us on Twitter!" target="_blank"  rel="noreferrer" role="button">{twitter}</a>

            <a className="btn btn-outline-light btn-floating m-1" href="https://linkedin.com/" title="Talk about us on Linked In!" target="_blank"  rel="noreferrer" role="button">{linkedIn}</a>

            <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/" title="Visit our GitHub Repository!" target="_blank"  rel="noreferrer" role="button">{github}</a>

        </div>
    </div>
</div>
    )
}