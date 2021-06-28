import React, { useState } from "react";
import { Link } from "react-router-dom";

//<img id="logo" src="NMPlogo.PNG"></img>
function Header() {
  const [route, setRoute] = useState("/");
  const isMobile = window.innerWidth < 571;
  const [showNav, setShowNav] = useState(false);
  return (
    <header>
      <h1>
        <a href="/">
          The New Maps Project{" "}
          {window.location == "/visualizer" && (
            <span
              style={{ textShadow: "black 2px 2px 3px", color: "lightcoral" }}
            >
              Visualizer
            </span>
          )}
        </a>
        {isMobile && (
          <button
            id="open-close-options"
            onClick={() => setShowNav(!showNav)}
            class="fa fa-bars"
          ></button>
        )}
      </h1>
      {!isMobile || showNav ? (
        <ul>
          {isMobile && (
            <h2 className="mobile-menu-title">
              Menu <i className="fa fa-bars"></i>
            </h2>
          )}
          {isMobile && (
            <button
              className="fas fa-times menu-x-out"
              onClick={() => setShowNav(false)}
            ></button>
          )}
          <li>
            <a href="/mission" className="no-box">
              Mission
            </a>
          </li>
          <li>
            <a href="/visualizer">Visualize</a>
          </li>
          <li>
            <a href="/algorithm" className="no-box">
              Algorithm
            </a>
          </li>
          

          <li className="dropdown-container">
            <div className="no-box">
              More <i className="fas fa-caret-down"></i>
            </div>
            <ul id="more-options">
              <li>
                <a href="/info" className="no-box">
                  Info
                </a>
              </li>
              <li>
                <a href="/news" className="no-box">
                  News
                </a>
              </li>
              <li>
                <a href="/gallery" className="no-box">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/datastore" className="no-box">
                  Datastore
                </a>
              </li>
              <li>
                <a href="/docs" className="no-box">
                  Docs
                </a>
              </li>
              <li>
                <a href="/team" className="no-box">
                  Team
                </a>
              </li>
            </ul>
          </li>
        </ul>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
