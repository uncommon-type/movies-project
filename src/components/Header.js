import React from "react";

import LogoIcon from "../Icons/Logo.js";

const Header = () => (
  <header className="app__header">
    <h1>
      <LogoIcon className="app__header__logo" />
      Movie App
    </h1>
    <p>Build your want-to-see-list</p>
  </header>
);

export default Header;
