export function RTValue(content, type) {
    this.type = 'Value';
    this.content = content;
    if (content === undefined)
    {
        this.type = 'EmptyValue';
        this.valType = '?'; // Optional type
    }
    else this.valType = type ?? LitPattern.inferType(content);
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

export function RTAssignment(targetVar, value) {
    if (targetVar.constant)
        return /*panic(),*/ false;

    return {
        eval: () => { targetVar.value = value; },
        initialization: () => {
            let obj = {
                targetVar: targetVar.declaration(),
                value
            }

            delete obj['targetVar']['type'];
            return obj;
        }
    };
}

window.RTValue = RTValue;
window.RTExpression = RTExpression;
window.RTVariable = RTVariable;
window.RTAssignment = RTAssignment;
