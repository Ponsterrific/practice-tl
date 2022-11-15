import React from "react";

const FilterButton = ({isPressed, setFilter, name}) => {
    return (
        <button
            type="button"
            className="filter-button"
            aria-pressed={isPressed}
            onClick={() => setFilter(name)}
        >
            <span className="visually-hidden">Show </span>
            <span>{name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;