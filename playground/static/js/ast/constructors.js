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


window.RTValue = RTValue;
window.RTExpression = RTExpression;
