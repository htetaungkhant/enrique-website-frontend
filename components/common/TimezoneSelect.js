import React from 'react';
import { useTimezoneSelect } from 'react-timezone-select';

const CustomTimezoneSelect = ({ value, onChange, className }) => {
    const { options, parseTimezone } = useTimezoneSelect({ value });

    const handleChange = (e) => {
        const timezone = parseTimezone(e.target.value);
        onChange?.(timezone);
    };

    return (
        <select
            value={typeof value === 'object' ? value.value : value || ''}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md relative bg-white text-black ${className}`}
        >
            <option value="" disabled hidden>
                Select a time zone
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default CustomTimezoneSelect; 