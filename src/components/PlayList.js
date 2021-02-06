import React from "react";
import PlayListItem from "./PlayListItem";

const PlayList = () => (
  <section className="playlist-group">
    <h3 className="playlist__title text-700">Playlist</h3>
    <ul id="playlist__container">
      <PlayListItem className="playlist-item" />
      <PlayListItem className="playlist-item" />
    </ul>
  </section>
);

export default PlayList;
