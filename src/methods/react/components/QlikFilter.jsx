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

  return (
    <div
      className="qlikFilter"
      style={{ width: 234, height: 332, overflowY: "overlay" }}
    >
      <div
        className="qlikFilter-buttons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          <button class="lui-button">
            <span
              class="lui-icon  lui-icon--more"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
            ></span>
          </button>
        </Tippy>
        <button class="lui-button">
          <span
            class="lui-icon lui-icon--clear-selections"
            aria-hidden="true"
            style={{ cursor: "pointer" }}
          ></span>
        </button>
        <button
          class="lui-button  lui-button--danger"
          style={{ cursor: "pointer" }}
          onClick={(e) => setFilter("" || undefined)}
        >
          <span class="lui-icon lui-icon--close" aria-hidden="true"></span>
        </button>
        <button
          class="lui-button  lui-button--success"
          style={{ cursor: "pointer" }}
        >
          <span class="lui-icon lui-icon--tick" aria-hidden="true"></span>
        </button>
      </div>
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
  );
};

export default QlikFilter;
