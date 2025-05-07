export function RTValue(content, type) {
    this.type = 'Value';
    this.content = content;
    if (content === undefined)
        this.type = 'EmptyValue';

    this.valType = type ?? qrtInferType(content);
}

function qrtInferType(value) {
    if (value === undefined)
        return '?'; // Null

    if (!isNaN(value)) { // TODO: move to some lookup table
        let possibleTypes = ['uint', 'int'];
        const number = parseInt(value);
        if (number < 0)
            possibleTypes.splice(0, 1); // It's not possible to be unsigned

        if (possibleTypes.length === 0)
            return false;

        return possibleTypes[0];
    }

    if (value.isSurroundedBy('"'))
        return 'string';

    return 'ID';
}

window.RTValue = RTValue;
