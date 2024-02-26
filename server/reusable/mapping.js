const newMapping = (originalObject, newKeyName) => {

    const modifiedResult = {}
    
    for (const [oldKey, value] of Object.entries(originalObject)) {
        const newKey = newKeyName[oldKey];
        if (newKey) {
            modifiedResult[newKey] = value;
        }
    }

    return modifiedResult;
}

export default newMapping;