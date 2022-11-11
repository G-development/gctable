import React from "react";
import Tippy from "@tippyjs/react";
import { qlik } from "../../paint";

// Qlik Filter component
const QlikFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const [search, setSearch] = React.useState(undefined);

  const options = React.useMemo(() => {
    const options = new Set();
    const navs = new Set();
    preFilteredRows.forEach((row) => {
      if (
        row.values[id].value?.toLowerCase().includes(search) ||
        search == undefined
      ) {
        options.add(row.values[id].value);
        navs.add(row.values[id]?.nav?.sel);
      }
    });
    return { option: [...options.values()], navs: [...navs.values()] };
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
    <div className="qlikFilter" style={{ width: 234, maxHeight: 332 }}>
      {/* <div
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
          <button className="lui-button lui-disabled">
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
      </div> */}
      {/* SEARCH INPUT */}
      <div className="qlikFilter-search">
        <span className="lui-icon  lui-icon--search" aria-hidden="true"></span>
        <input
          type="text"
          className="lui-search__input ng-pristine ng-valid ng-empty ng-valid-maxlength ng-touched"
          placeholder="Search in listbox"
          onChange={(e) => setSearch(e.target.value.toLowerCase() || undefined)}
        />
      </div>
      {/* SEARCH ITEMS */}
      <div
        className="qlikFilter-items"
        style={{
          height: 300 - 38,
          overflowY: "overlay",
          whiteSpace: "nowrap",
          overflowX: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {options.option.map((option, i) => (
          <p
            key={i}
            value={option}
            onClick={(e) => {
              setFilter(option || undefined);
              qlik.fun.promiseNavigationHistory(
                null,
                options.navs[i],
                null,
                false
              );
            }}
            style={{
              borderBottom: "1px solid lightgrey",
              textAlign: "left",
              padding: "4px 0",
            }}
          >
            <abbr
              title={option}
              style={{ textDecoration: "none", fontSize: 12 }}
            >
              {option}
            </abbr>
          </p>
        ))}
      </div>
    </div>
  );
};

export default QlikFilter;
