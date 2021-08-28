import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Auth from "./../../utils/auth";
import logo from "./../../assets/logo.png";
import "./style.css";

const donate = <FontAwesomeIcon icon={faDonate} />;

export default function NavTabs() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      const userId = Auth.getUserId();
      return (
        <nav>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active nav-text me-4"
                aria-current="page"
              >
                Full Stack Developer Community
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/user/${userId}`}
                className="nav-link active nav-text me-4 text-color"
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/donate"
                className="nav-link active nav-text me-4"
                aria-current="page"
              >
                Donate! {donate}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active nav-text me-4"
                href="/"
                onClick={() => Auth.logout()}
                aria-current="page"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active nav-text me-4"
                aria-current="page"
              >
                Full Stack Developer Community
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link active nav-text me-4"
                aria-current="page"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-link active nav-text me-4"
                aria-current="page"
              >
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
  return (
    <header className="hero nav-style align-items-center justify-content-evenly sticky-top p-2">
      <div className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="navbar-brand ms-4">
            <img
              src={logo}
              alt="FSDC"
              width="64"
              height="64"
              className="d-inline-block align-text-center me-1 "
            />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <nav>{showNavigation()}</nav>
          </div>
        </div>
      </div>
    </header>
  );
}
