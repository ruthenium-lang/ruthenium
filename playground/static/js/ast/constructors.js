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

function inferType(value) {
    if (!isNaN(value))
        return 'uint';

    if (value.isSurroundedBy('"'))
        return 'String';

    return 'ID';
}

window.RTValue = RTValue;
window.RTExpression = RTExpression;
