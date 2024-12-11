import React from 'react'
import mooitLogo from "../../images/mooit-logo.svg";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div class="top-content">
      <div class="container-fluid home">
        <nav class="navbar navbar-expand-lg">
            <Link class="navbar-brand" to="/">
              <img src={mooitLogo} alt="mooitLogo" class="logo" />
            </Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav center-links fw-bold">
                <li class="nav-item">
                  <Link class="nav-link" aria-current="page" to="">Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="">Features</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="">Pricing</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="">Blog</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="">Contact</Link>
                </li>
              </ul>
              <div class="d-flex ms-auto flex-wrap align-items-center fw-bold button-group">
                <div class="nav-item login-btn">
                  <Link class="nav-link" to="/admin">Login</Link>
                </div>
                <button class="btn btn-outline-secondary text-dark fw-bold try-it-btn">Try it free</button>
              </div>
            </div>
        </nav>
      </div>
      </div>
  )
}

export default Header