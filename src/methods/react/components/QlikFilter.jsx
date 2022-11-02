import React from "react";
import Tippy from "@tippyjs/react";

// Qlik Filter component
const QlikFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const [search, setSearch] = React.useState(undefined);

  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      if (
        row.values[id].value?.toLowerCase().includes(search) ||
        search == undefined
      )
        options.add(row.values[id].value);
    });
    return [...options.values()];
  }, [id, preFilteredRows, search]);

  const qlikFilterBTNS = [
    {
      abbr: "Clear selection",
      btn: true,
      btnType: "",
      icon: "clear-selections",
    },

    {
      abbr: "Cancel selections",
      btn: true,
      btnType: "danger",
      btnOnClick: (e) => setFilter("" || undefined),
      icon: "close",
    },
    {
      abbr: "Apply selections",
      btn: true,
      btnType: "success",
      icon: "tick",
    },
  ];

  return (
    <div className="qlikFilter" style={{ width: 234, height: 332 }}>
      <div
        className="qlikFilter-buttons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          padding: 2,
          marginBottom: 4,
        }}
      >
        <Tippy
          content="More"
          allowHTML={true}
          interactive={true}
          interactiveBorder={20}
          delay={50}
          trigger="click"
        >
          <button className="lui-button">
            <span
              className="lui-icon  lui-icon--more"
              aria-hidden="true"
            ></span>
          </button>
        </Tippy>
        {qlikFilterBTNS.map((f, i) => {
          return (
            <abbr title={f.abbr} key={i}>
              <button
                className={`lui-button  lui-button${
                  f.btnType != "" ? "--" + f.btnType : ""
                }`}
                onClick={f?.btnOnClick}
              >
                <span
                  className={`lui-icon  lui-icon--${f.icon}`}
                  aria-hidden="true"
                ></span>
              </button>
            </abbr>
          );
        })}
      </div>
      {/* SEARCH INPUT */}
      <div className="qlikFilter-search">
        <span className="lui-icon  lui-icon--search" aria-hidden="true"></span>
        <input
          type="text"
          className="lui-search__input ng-pristine ng-valid ng-empty ng-valid-maxlength ng-touched"
          placeholder="Cerca nella casella di elenco"
          onChange={(e) => setSearch(e.target.value.toLowerCase() || undefined)}
        />
      </div>
      {/* SEARCH ITEMS */}
      <div
        className="qlikFilter-items"
        style={{ height: 300 - 38, overflowY: "overlay" }}
      >
        {options.map((option, i) => (
          <p
            key={i}
            value={option}
            onClick={(e) => setFilter(option || undefined)}
            style={{
              borderBottom: "1px solid lightgrey",
              textAlign: "left",
              padding: "4px 0",
            }}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

export default QlikFilter;
