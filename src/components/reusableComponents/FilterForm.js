import React from 'react';

const FilterForm = ({
    fields = [],  // Default to an empty array if fields is undefined
    checkboxes = [],  // Default to an empty array if checkboxes is undefined
    buttons = [],
    onFilter,
    onAction
}) => {
    return (
        <div className="filter-form">
            {fields.map((field, index) => (
                <div className='filter-form-input-element' key={index}>
                    <label>{field.label}</label>
                    {field.type === 'date' ? (
                        <input
                            type="date"
                            placeholder={field.placeholder}
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    ) : field.type === 'select' ? (
                        <select onChange={(e) => field.onChange(e.target.value)} defaultValue="">
                            <option value="" disabled>Select {field.label}</option>
                            {field.options.map((option, i) => (
                                <option key={i} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            placeholder={field.placeholder}
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    )}
                </div>
            ))}

            {checkboxes.map((checkbox, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="checkbox"
                            onChange={(e) => checkbox.onChange(e.target.checked)}
                        />
                        {checkbox.label}
                    </label>
                </div>
            ))}

            <button onClick={onFilter}>Apply Filters</button>

            <div className="action-buttons">
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
        </div>
    );
};

export default FilterForm;
