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


window.RTValue = RTValue;
