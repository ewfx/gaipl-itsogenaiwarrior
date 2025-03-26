'use strict';

exports.transformResponse = (data, keyMapping) => {
    // If it's an array, recursively transform each item in the array
    if (Array.isArray(data)) {
        return data.map(item => this.transformResponse(item, keyMapping));
    }

    // If it's an object, recursively transform the object keys
    else if (typeof data === 'object' && data !== null) {
        const transformedData = {};
        Object.keys(data).forEach(oldKey => {
            // If the old key has a transformation, use the new key
            const newKey = keyMapping[oldKey] || oldKey;
            // Recursively transform the value if it's an object or array
            transformedData[newKey] = this.transformResponse(
                data[oldKey],
                keyMapping,
            );
        });
        return transformedData;
    }

    // Return the data as is if it's neither an object nor an array (base case)
    return data;
};

// A utility to transform deeply nested keys using dot notation in the keyMapping
exports.applyNestedKeyMapping = (data, keyMapping) => {
    const newData = {};

    Object.keys(data).forEach(oldKey => {
        const newKey = keyMapping[oldKey] || oldKey;
        // If the newKey contains a dot, it's a nested key
        if (newKey.includes('.')) {
            const keys = newKey.split('.'); // Split dot notation into keys
            // Use the keys to access and transform the nested structure
            let temp = newData;
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    temp[key] = data[oldKey]; // Set the final key's value
                } else {
                    temp[key] = temp[key] || {}; // Create nested structure if it doesn't exist
                    temp = temp[key]; // Move down to the next level
                }
            });
        } else {
            // If no dot, just assign the value directly
            newData[newKey] = data[oldKey];
        }
    });

    return newData;
};
