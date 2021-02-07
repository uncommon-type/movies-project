import React from "react";
import PlayListItem from "./PlayListItem";

const PlayList = ({ playList, onRemove }) => (
  <section className="playlist-group">
    <h3 className="playlist__title text-700">Playlist</h3>
    <ul id="playlist__container">
      {playList.map(({ id, title, year }) => (
        <PlayListItem
          key={id}
          className="playlist-item"
          id={id}
          title={title}
          year={year}
          onRemove={onRemove}
        />
      ))}
    </ul>
  </section>
);

export default PlayList;
