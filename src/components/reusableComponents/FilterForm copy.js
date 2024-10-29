import React from 'react';

const FilterForm = ({ fields, checkboxes, buttons, onFilter, onAction }) => {
    return (
        <div className="filter-form">
            <div className="filter-fields">
                {fields.map((field, index) => (
                    <div key={index} className="filter-field">
                        <label>{field.label}</label>
                        <input
                            type="text"
                            placeholder={field.placeholder}
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="filter-checkboxes">
                {checkboxes.map((checkbox, index) => (
                    <div key={index} className="filter-checkbox">
                        <input
                            type="checkbox"
                            onChange={(e) => checkbox.onChange(e.target.checked)}
                        />
                        <label>{checkbox.label}</label>
                    </div>
                ))}
            </div>

            <div className="filter-buttons">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        style={{ backgroundColor: button.color }}
                        onClick={() => onAction(button.action)}
                    >
                        {button.label}
                    </button>
                ))}
            </div>

            <button onClick={onFilter}>Filter</button>
        </div>
    );
};

export default FilterForm;