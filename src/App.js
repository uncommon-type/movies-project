import React, { Fragment, useState } from "react";
import SearchBar from "./containers/SearchBar";
import Header from "./components/Header";
import SearchResults from "./containers/SearchResults";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Fragment>
      <Header />
      <SearchBar />
      <main id="app__main-content">
        <article className="wrapper">
          <div className="main-content__body splitter gap-top-600">
            <SearchResults />
          </div>
        </article>
      </main>
    </Fragment>
  );
};

export default App;
