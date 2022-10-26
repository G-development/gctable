import React from "react";
import Tippy from "@tippyjs/react";

// Qlik Filter component
const QlikFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id].value);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

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

      <div
        className="qlikFilter-items"
        style={{ height: 300, overflowY: "overlay" }}
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
