import { useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    placeholder?: string;
    onChange: (value: string) => void;
    className?: string;
    defaultValue?: string;
    value?: string;
    name?: string;
    id?: string;
    onBlur?: React.FocusEventHandler<HTMLSelectElement>;
    disabled?: boolean | undefined;
    error?: boolean;
    hint?: string;
}

const Select: React.FC<SelectProps> = ({
    options,
    placeholder = 'Select an option',
    onChange,
    className = '',
    defaultValue = '',
    value,
    name,
    id,
    onBlur,
    disabled = undefined,
    error = false,
    hint,
}) => {
    const [internalValue, setInternalValue] = useState<string>(defaultValue);
    const selectedValue = value ?? internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextValue = e.target.value;
        if (value === undefined) {
            setInternalValue(nextValue);
        }
        onChange(nextValue);
    };

    return (
        <div>
            <select
                id={id}
                name={name}
                className={`h-11 w-full appearance-none rounded-lg border bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
                    error
                        ? 'border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500 dark:focus:border-error-800'
                        : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800'
                } ${
                    selectedValue
                        ? 'text-gray-800 dark:text-white/90'
                        : 'text-gray-400 dark:text-gray-400'
                } ${className}`}
                value={selectedValue}
                onChange={handleChange}
                onBlur={onBlur}
                disabled={disabled}
                aria-invalid={error || undefined}
            >
                <option
                    value=""
                    disabled
                    className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {hint && (
                <p
                    className={`mt-1.5 text-xs ${
                        error ? 'text-error-500' : 'text-gray-500'
                    }`}
                >
                    {hint}
                </p>
            )}
        </div>
    );
};

export default Select;
