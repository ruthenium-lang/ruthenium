export function RTValue(content, type) {
    this.type = 'Value';
    this.content = content;
    if (content === undefined)
        this.type = 'EmptyValue';

    this.valType = type ?? LitPattern.inferType(content);
}

window.RTValue = RTValue;
