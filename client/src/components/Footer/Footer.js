import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";


const facebook = <FontAwesomeIcon icon={faFacebook} size="2x"/>;
const twitter = <FontAwesomeIcon icon={faTwitter} size="2x"/>;
const stackOverflow = <FontAwesomeIcon icon={faStackOverflow} size="2x"/>;
const linkedIn = <FontAwesomeIcon icon={faLinkedin} size="2x"/>;
const github = <FontAwesomeIcon icon={faGithub} size="2x"/>;

export default function Footer() {
    return (
    <div className="text-center text-white footer-color footer-position">
    <div className="row p-2">
        <div className="m-2 d-flex flex-nowrap justify-content-evenly">
            <a className="btn btn-outline-light btn-floating me-2" href="https://www.stackoverflow.com/" title="Talk about us on Stack Overflow!" target="_blank"  rel="noreferrer" role="button">{stackOverflow}</a>

            <a className="btn btn-outline-light btn-floating me-2" href="https://www.facebook.com/" title="Talk about us on Facebook!" target="_blank"  rel="noreferrer" role="button">{facebook}</a>

            <a className="btn btn-outline-light btn-floating me-2" href="https://twitter.com/?lang=en" title="Talk about us on Twitter!" target="_blank"  rel="noreferrer" role="button">{twitter}</a>

            <a className="btn btn-outline-light btn-floating me-2" href="https://linkedin.com/" title="Talk about us on Linked In!" target="_blank"  rel="noreferrer" role="button">{linkedIn}</a>

            <a className="btn btn-outline-light btn-floating me-2" href="https://github.com/" title="Visit our GitHub Repository!" target="_blank"  rel="noreferrer" role="button">{github}</a>

        </div>
    </div>
</div>
    )
}