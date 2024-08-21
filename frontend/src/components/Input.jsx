import React from 'react';

const Input = ({
    className,
    error,
    ...props
}) => {
    return (
        <div className="relative">
            <input
                {...props}
                className={`caret-orange-500 bg-gray-800 bg-opacity-50 placeholder-gray-500 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-100 text-gray-100 ${className} ${error ? 'border-red-500' : 'border-gray-400'}`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default Input;
