import React, { useState } from 'react';

const RangeFilter = ({ name, type, onRangeChange, label, minPlaceholder, maxPlaceholder }) => {
    const [range, setRange] = useState({ min: '', max: '' });

    const handleChange = (field, value) => {
        const updatedRange = { ...range, [field]: value };
        setRange(updatedRange);
        onRangeChange({ name, type, range: updatedRange });
    };

    return (
        <div>
            <label>{label}</label>
            <input
                type="text"
                placeholder={minPlaceholder || 'Min'}
                value={range.min}
                onChange={(e) => handleChange('min', e.target.value)}
            />
            <input
                type="text"
                placeholder={maxPlaceholder || 'Max'}
                value={range.max}
                onChange={(e) => handleChange('max', e.target.value)}
            />
        </div>
    );
};

export default RangeFilter;
