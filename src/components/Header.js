import React, { Fragment } from "react";

const Header = () => (
  <Fragment>
    <div className="app__wave-container">
      <svg
        className="app__wave"
        viewBox="0 0 1440 116"
        preserveAspectRatio="none"
      >
        <path d="M0,80.4l40-21.1C80,37.7,160-3.9,240,1s160,58.5,240,74.1c80,16.2,160-5.6,240-10.7c80-4.9,160,4.9,240,21.1c80,15.6,160,37.4,240,26.5s160-52.6,200-74.1l40-21.1V0H0V80.4z"></path>
      </svg>
    </div>
    <header className="app__header">
      <div className="app__header__inner">
        <h1 className="headline text-400 md:text-600">Movie App</h1>
      </div>
    </header>
  </Fragment>
);

export default Header;
