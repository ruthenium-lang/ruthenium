export function RTValue(content, type) {
    this.type = 'Value';
    this.content = content;
    if (content === undefined)
    {
        this.type = 'EmptyValue';
        this.valType = '?'; // Optional type
    }
    else this.valType = type ?? inferType(content);
}

export function RTExpression(content) {
    this.type = 'Expression';
    this.content = content;
}

export function RTVariable(name, value, constant = false) {
    this.type = 'Variable';
    this.name = name;
    this.constant = constant;
    this.value = value ?? new RTValue();

    // TODO: Add initialization
    this.declaration = () => {
        let obj = {
            ...this,
            type: 'VariableDeclaration',
            varType: this.value.valType
        };
        delete obj['declaration'];
        delete obj['value'];
        return obj;
    };
}

function inferType(value) {
    if (!isNaN(value)) {
        let possibleTypes = ['uint', 'int'];
        const number = parseInt(value);
        if (number < 0)
            possibleTypes.splice(0, 1); // It's not possible to be unsigned

        if (possibleTypes.length === 0)
            return false; // TODO: error handling

        return possibleTypes[0];
    }

    if (value.isSurroundedBy('"'))
        return 'String';

    return 'ID';
}

window.RTValue = RTValue;
window.RTExpression = RTExpression;
window.RTVariable = RTVariable;
