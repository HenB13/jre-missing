import classnames from "classnames";
import React, { useState } from "react";
import styles from "./Searchbox.module.css";
import { ReactComponent as SearchIcon } from "../icons/SearchboxIcon.svg";

const Searchbox = React.forwardRef(
  ({ missingEpisodesShown, setMissingEpisodesShown, shakeEpisodes, allEpisodes }, ref) => {
    const [searchText, setSearchText] = useState("");
    const [placeholder, setPlaceholder] = useState("Search for episode or guest");

    const handleSearch = (e) => {
      if (!allEpisodes) return;
      setMissingEpisodesShown(() => {
        return allEpisodes.filter((ep) =>
          ep.full_name?.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setSearchText(e.target.value);
    };

    const classesSearchIcon = classnames(styles.SearchIcon, {
      [styles.hoverCursor]: searchText,
    });

    return (
      <>
        <div className={styles.Searchbox}>
          <input
            value={searchText}
            ref={ref}
            onChange={handleSearch}
            type="text"
            id="search"
            placeholder={placeholder}
            onFocus={() => setPlaceholder(null)}
            onBlur={() => setPlaceholder("Search for episode or guest")}
            onKeyUp={(e) => {
              if (e.key === "Enter") shakeEpisodes();
            }}
            spellCheck="false"
            autoComplete="off"
            disabled={!missingEpisodesShown}
          />

          <SearchIcon
            className={classesSearchIcon}
            title="search-icon"
            onClick={() => {
              if (searchText) {
                shakeEpisodes();
                navigator.vibrate();
              }
            }}
          />
        </div>
        {searchText && (
          <p className={styles.searchResult}>
            {missingEpisodesShown.length} result
            {missingEpisodesShown.length != 1 && "s"} found
          </p>
        )}
      </>
    );
  }
);

Searchbox.displayName = "Searchbox";

export default Searchbox;
